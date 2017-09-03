import { Component, HostBinding, HostListener, ApplicationRef, } from '@angular/core';
import { flyInOut } from '../animations/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastData } from './toastrConfig';
import { ToastrService } from './toastrService';
import { ToastRef } from './toastInjector';
var Toast = (function () {
    function Toast(toastrService, data, toastRef, appRef, sanitizer) {
        var _this = this;
        this.toastrService = toastrService;
        this.data = data;
        this.toastRef = toastRef;
        this.appRef = appRef;
        this.sanitizer = sanitizer;
        this.width = -1;
        this.toastClasses = '';
        this.state = 'inactive';
        this.options = data.optionsOverride;
        this.toastId = data.toastId;
        this.message = data.message;
        if (this.message && this.options.enableHtml) {
            this.message = sanitizer.bypassSecurityTrustHtml(data.message);
        }
        this.title = data.title;
        this.onTap = data.onTap;
        this.onAction = data.onAction;
        this.toastClasses = data.toastType + " " + this.options.toastClass;
        this.options.timeOut = +this.options.timeOut;
        this.sub = toastRef.afterActivate().subscribe(function () {
            _this.activateToast();
        });
        this.sub1 = toastRef.manualClosed().subscribe(function () {
            _this.remove();
        });
    }
    Toast.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    Toast.prototype.activateToast = function () {
        var _this = this;
        this.state = 'active';
        if (this.options.timeOut !== 0) {
            this.timeout = setTimeout(function () {
                _this.remove();
            }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
        if (this.options.onActivateTick) {
            this.appRef.tick();
        }
    };
    Toast.prototype.updateProgress = function () {
        if (this.width === 0) {
            return;
        }
        var now = new Date().getTime();
        var remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.width <= 0) {
            this.width = 0;
        }
    };
    Toast.prototype.remove = function () {
        var _this = this;
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = 'removed';
        this.timeout = setTimeout(function () { return _this.toastrService.remove(_this.toastId); }, 300);
    };
    Toast.prototype.tapToast = function () {
        if (this.state === 'removed') {
            return;
        }
        this.onTap.next();
        this.onTap.complete();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    Toast.prototype.stickAround = function () {
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        clearInterval(this.intervalId);
        this.width = 0;
    };
    Toast.prototype.delayedHideToast = function () {
        var _this = this;
        if (+this.options.extendedTimeOut === 0 || this.state === 'removed') {
            return;
        }
        this.timeout = setTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = +this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + this.options.timeOut;
        this.width = 100;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    return Toast;
}());
export { Toast };
Toast.decorators = [
    { type: Component, args: [{
                selector: '[toast-component]',
                template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" ripple-radius>\n    &times;\n  </button>\n  <div *ngIf=\"title\" class=\"{{options.titleClass}}\" [attr.aria-label]=\"title\">\n    {{title}}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" class=\"{{options.messageClass}}\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" class=\"{{options.messageClass}}\" [attr.aria-label]=\"message\">\n    {{message}}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width.%]=\"width\"></div>\n  </div>\n  ",
                animations: [
                    flyInOut
                ],
            },] },
];
Toast.ctorParameters = function () { return [
    { type: ToastrService, },
    { type: ToastData, },
    { type: ToastRef, },
    { type: ApplicationRef, },
    { type: DomSanitizer, },
]; };
Toast.propDecorators = {
    'toastClasses': [{ type: HostBinding, args: ['class',] },],
    'state': [{ type: HostBinding, args: ['@flyInOut',] },],
    'tapToast': [{ type: HostListener, args: ['click',] },],
    'stickAround': [{ type: HostListener, args: ['mouseenter',] },],
    'delayedHideToast': [{ type: HostListener, args: ['mouseleave',] },],
};
//# sourceMappingURL=toastComponent.js.map