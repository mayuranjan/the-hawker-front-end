import { Directive, ElementRef, EventEmitter, Input, Output, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { NgUploaderService } from '../classes/ngx-uploader.class';
var NgFileDropDirective = (function () {
    function NgFileDropDirective(platform_id, elementRef) {
        this.platform_id = platform_id;
        this.elementRef = elementRef;
        this.isServer = isPlatformServer(this.platform_id);
        this.stopEvent = function (e) {
            e.stopPropagation();
            e.preventDefault();
        };
        this.upload = new NgUploaderService();
        this.uploadOutput = new EventEmitter();
    }
    NgFileDropDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isServer) {
            return;
        }
        this.el = this.elementRef.nativeElement;
        this.upload.serviceEvents.subscribe(function (event) {
            _this.uploadOutput.emit(event);
        });
        if (this.uploadInput instanceof EventEmitter) {
            this.upload.initInputEvents(this.uploadInput);
        }
        this.el.addEventListener('drop', this.stopEvent, false);
        this.el.addEventListener('dragenter', this.stopEvent, false);
        this.el.addEventListener('dragover', this.stopEvent, false);
        this.el.addEventListener('dragover', this.stopEvent, false);
    };
    NgFileDropDirective.prototype.ngOnDestroy = function () {
        if (this.isServer) {
            return;
        }
        this.uploadInput.unsubscribe();
    };
    NgFileDropDirective.prototype.onDrop = function (e) {
        e.stopPropagation();
        e.preventDefault();
        var event = { type: 'drop' };
        this.uploadOutput.emit(event);
        this.upload.handleFiles(e.dataTransfer.files);
    };
    NgFileDropDirective.prototype.onDragOver = function (e) {
        if (!e) {
            return;
        }
        var event = { type: 'dragOver' };
        this.uploadOutput.emit(event);
    };
    NgFileDropDirective.prototype.onDragLeave = function (e) {
        if (!e) {
            return;
        }
        var event = { type: 'dragOut' };
        this.uploadOutput.emit(event);
    };
    return NgFileDropDirective;
}());
export { NgFileDropDirective };
NgFileDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngFileDrop]'
            },] },
];
NgFileDropDirective.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ElementRef, },
]; };
NgFileDropDirective.propDecorators = {
    'uploadInput': [{ type: Input },],
    'uploadOutput': [{ type: Output },],
    'onDrop': [{ type: HostListener, args: ['drop', ['$event'],] },],
    'onDragOver': [{ type: HostListener, args: ['dragover', ['$event'],] },],
    'onDragLeave': [{ type: HostListener, args: ['dragleave', ['$event'],] },],
};
//# sourceMappingURL=ng-file-drop.directive.js.map