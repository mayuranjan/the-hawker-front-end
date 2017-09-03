import { Directive, ElementRef, EventEmitter, Input, Output, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { NgUploaderService } from '../classes/ngx-uploader.class';
var NgFileSelectDirective = (function () {
    function NgFileSelectDirective(platform_id, elementRef) {
        var _this = this;
        this.platform_id = platform_id;
        this.elementRef = elementRef;
        this.isServer = isPlatformServer(this.platform_id);
        this.fileListener = function () {
            _this.upload.handleFiles(_this.el.files);
        };
        this.upload = new NgUploaderService();
        this.uploadOutput = new EventEmitter();
    }
    NgFileSelectDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isServer) {
            return;
        }
        this.el = this.elementRef.nativeElement;
        this.el.addEventListener('change', this.fileListener, false);
        this.upload.serviceEvents.subscribe(function (event) {
            _this.uploadOutput.emit(event);
        });
        if (this.uploadInput instanceof EventEmitter) {
            this.upload.initInputEvents(this.uploadInput);
        }
    };
    NgFileSelectDirective.prototype.ngOnDestroy = function () {
        if (this.isServer) {
            return;
        }
        this.el.removeEventListener('change', this.fileListener, false);
        this.uploadInput.unsubscribe();
    };
    return NgFileSelectDirective;
}());
export { NgFileSelectDirective };
NgFileSelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngFileSelect]'
            },] },
];
NgFileSelectDirective.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ElementRef, },
]; };
NgFileSelectDirective.propDecorators = {
    'uploadInput': [{ type: Input },],
    'uploadOutput': [{ type: Output },],
};
//# sourceMappingURL=ng-file-select.directive.js.map