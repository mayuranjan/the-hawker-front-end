var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { Toast } from './toastComponent';
var ToastConfig = (function () {
    function ToastConfig(config) {
        if (config === void 0) { config = {}; }
        this.closeButton = false;
        this.extendedTimeOut = 1000;
        this.progressBar = false;
        this.timeOut = 5000;
        this.enableHtml = false;
        this.toastClass = 'toast';
        this.positionClass = 'toast-top-right';
        this.titleClass = 'toast-title';
        this.messageClass = 'toast-message';
        this.tapToDismiss = true;
        this.toastComponent = Toast;
        this.onActivateTick = false;
        this.closeButton = config.closeButton || this.closeButton;
        if (config.extendedTimeOut === 0) {
            this.extendedTimeOut = config.extendedTimeOut;
        }
        else {
            this.extendedTimeOut = config.extendedTimeOut || this.extendedTimeOut;
        }
        this.progressBar = config.progressBar || this.progressBar;
        if (config.timeOut === 0) {
            this.timeOut = config.timeOut;
        }
        else {
            this.timeOut = config.timeOut || this.timeOut;
        }
        this.enableHtml = config.enableHtml || this.enableHtml;
        this.toastClass = config.toastClass || this.toastClass;
        this.positionClass = config.positionClass || this.positionClass;
        this.titleClass = config.titleClass || this.titleClass;
        this.messageClass = config.messageClass || this.messageClass;
        if (config.tapToDismiss !== undefined) {
            this.tapToDismiss = config.tapToDismiss;
        }
        this.toastComponent = config.toastComponent || this.toastComponent;
        this.onActivateTick = config.onActivateTick || this.onActivateTick;
    }
    return ToastConfig;
}());
export { ToastConfig };
var ToastrIconClasses = (function () {
    function ToastrIconClasses() {
    }
    return ToastrIconClasses;
}());
export { ToastrIconClasses };
ToastrIconClasses.decorators = [
    { type: Injectable },
];
ToastrIconClasses.ctorParameters = function () { return []; };
var ToastrConfig = (function (_super) {
    __extends(ToastrConfig, _super);
    function ToastrConfig(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.maxOpened = 0;
        _this.autoDismiss = false;
        _this.iconClasses = {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
        };
        _this.newestOnTop = true;
        _this.preventDuplicates = false;
        _this.maxOpened = config.maxOpened || _this.maxOpened;
        _this.autoDismiss = config.autoDismiss || _this.autoDismiss;
        if (config.iconClasses) {
            _this.iconClasses.error = _this.iconClasses.error || config.iconClasses.error;
            _this.iconClasses.info = _this.iconClasses.info || config.iconClasses.info;
            _this.iconClasses.success = _this.iconClasses.success || config.iconClasses.success;
            _this.iconClasses.warning = _this.iconClasses.warning || config.iconClasses.warning;
        }
        _this.newestOnTop = config.newestOnTop || _this.newestOnTop;
        _this.preventDuplicates = config.preventDuplicates || _this.preventDuplicates;
        return _this;
    }
    return ToastrConfig;
}(ToastConfig));
export { ToastrConfig };
ToastrConfig.decorators = [
    { type: Injectable },
];
ToastrConfig.ctorParameters = function () { return [
    { type: ToastrConfig, },
]; };
var ToastData = (function () {
    function ToastData() {
    }
    return ToastData;
}());
export { ToastData };
//# sourceMappingURL=toastrConfig.js.map