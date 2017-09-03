import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/combineLatest';
export var UploadStatus;
(function (UploadStatus) {
    UploadStatus[UploadStatus["Queue"] = 0] = "Queue";
    UploadStatus[UploadStatus["Uploading"] = 1] = "Uploading";
    UploadStatus[UploadStatus["Done"] = 2] = "Done";
    UploadStatus[UploadStatus["Canceled"] = 3] = "Canceled";
})(UploadStatus || (UploadStatus = {}));
export function humanizeBytes(bytes) {
    if (bytes === 0) {
        return '0 Byte';
    }
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
var NgUploaderService = (function () {
    function NgUploaderService() {
        this.files = [];
        this.serviceEvents = new EventEmitter();
        this.uploads = [];
    }
    NgUploaderService.prototype.handleFiles = function (files) {
        var _this = this;
        this.fileList = files;
        this.files = [].map.call(files, function (file, i) {
            var uploadFile = {
                fileIndex: i,
                id: _this.generateId(),
                name: file.name,
                size: file.size,
                type: file.type,
                progress: {
                    status: UploadStatus.Queue,
                    data: {
                        percentage: 0,
                        speed: null,
                        speedHuman: null
                    }
                },
                lastModifiedDate: file.lastModifiedDate
            };
            _this.serviceEvents.emit({ type: 'addedToQueue', file: uploadFile });
            return uploadFile;
        });
        this.serviceEvents.emit({ type: 'allAddedToQueue' });
    };
    NgUploaderService.prototype.initInputEvents = function (input) {
        var _this = this;
        input.subscribe(function (event) {
            switch (event.type) {
                case 'uploadFile':
                    _this.serviceEvents.emit({ type: 'start', file: event.file });
                    var sub = _this.uploadFile(event.file, event).subscribe(function (data) {
                        _this.serviceEvents.emit(data);
                    });
                    _this.uploads.push({ file: event.file, sub: sub });
                    break;
                case 'uploadAll':
                    var concurrency = event.concurrency > 0 ? event.concurrency : Number.POSITIVE_INFINITY;
                    var subscriber = Subscriber.create(function (data) {
                        _this.serviceEvents.emit(data);
                    });
                    _this.uploads = _this.uploads.concat(_this.files.map(function (file) {
                        return { file: file, sub: null };
                    }));
                    var subscription = Observable.from(_this.files.map(function (file) { return _this.uploadFile(file, event); }))
                        .mergeAll(concurrency)
                        .combineLatest(function (data) { return data; })
                        .subscribe(subscriber);
                    break;
                case 'cancel':
                    var id_1 = event.id || null;
                    if (!id_1) {
                        return;
                    }
                    var index = _this.uploads.findIndex(function (upload) { return upload.file.id === id_1; });
                    if (index !== -1) {
                        if (_this.uploads[index].sub) {
                            _this.uploads[index].sub.unsubscribe();
                        }
                        _this.serviceEvents.emit({ type: 'cancelled', file: _this.uploads[index].file });
                        _this.uploads[index].file.progress.status = UploadStatus.Canceled;
                    }
                    break;
                case 'cancelAll':
                    _this.uploads.forEach(function (upload) {
                        upload.file.progress.status = UploadStatus.Canceled;
                        _this.serviceEvents.emit({ type: 'cancelled', file: upload.file });
                    });
                    break;
            }
        });
    };
    NgUploaderService.prototype.uploadFile = function (file, event) {
        var _this = this;
        return new Observable(function (observer) {
            var url = event.url;
            var method = event.method || 'POST';
            var data = event.data || {};
            var headers = event.headers || {};
            var reader = new FileReader();
            var xhr = new XMLHttpRequest();
            var time = new Date().getTime();
            var load = 0;
            xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percentage = Math.round((e.loaded * 100) / e.total);
                    var diff = new Date().getTime() - time;
                    time += diff;
                    load = e.loaded - load;
                    var speed = parseInt((load / diff * 1000), 10);
                    file.progress = {
                        status: UploadStatus.Uploading,
                        data: {
                            percentage: percentage,
                            speed: speed,
                            speedHuman: humanizeBytes(speed) + "/s"
                        }
                    };
                    observer.next({ type: 'uploading', file: file });
                }
            }, false);
            xhr.upload.addEventListener('error', function (e) {
                observer.error(e);
                observer.complete();
            });
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    file.progress = {
                        status: UploadStatus.Done,
                        data: {
                            percentage: 100,
                            speed: null,
                            speedHuman: null
                        }
                    };
                    try {
                        file.response = JSON.parse(xhr.response);
                    }
                    catch (e) {
                        file.response = xhr.response;
                    }
                    observer.next({ type: 'done', file: file });
                    observer.complete();
                }
            };
            xhr.open(method, url, true);
            var form = new FormData();
            try {
                var uploadFile_1 = _this.fileList.item(file.fileIndex);
                var uploadIndex = _this.uploads.findIndex(function (upload) { return upload.file.size === uploadFile_1.size; });
                if (_this.uploads[uploadIndex].file.progress.status === UploadStatus.Canceled) {
                    observer.complete();
                }
                form.append('file', uploadFile_1, uploadFile_1.name);
                Object.keys(data).forEach(function (key) { return form.append(key, data[key]); });
                Object.keys(headers).forEach(function (key) { return xhr.setRequestHeader(key, headers[key]); });
                _this.serviceEvents.emit({ type: 'start', file: file });
                xhr.send(form);
            }
            catch (e) {
                observer.complete();
            }
            return function () {
                xhr.abort();
                reader.abort();
            };
        });
    };
    NgUploaderService.prototype.generateId = function () {
        return Math.random().toString(36).substring(7);
    };
    return NgUploaderService;
}());
export { NgUploaderService };
//# sourceMappingURL=ngx-uploader.class.js.map