import { Subject } from 'rxjs/Subject';
import { ToastData } from './toastrConfig';
var ToastRef = (function () {
    function ToastRef(_overlayRef) {
        this._overlayRef = _overlayRef;
        this._afterClosed = new Subject();
        this._activate = new Subject();
        this._manualClose = new Subject();
    }
    ToastRef.prototype.manualClose = function () {
        this._manualClose.next();
        this._manualClose.complete();
    };
    ToastRef.prototype.manualClosed = function () {
        return this._manualClose.asObservable();
    };
    ToastRef.prototype.close = function () {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._afterClosed.complete();
    };
    ToastRef.prototype.afterClosed = function () {
        return this._afterClosed.asObservable();
    };
    ToastRef.prototype.isInactive = function () {
        return this._activate.isStopped;
    };
    ToastRef.prototype.activate = function () {
        this._activate.next();
        this._activate.complete();
    };
    ToastRef.prototype.afterActivate = function () {
        return this._activate.asObservable();
    };
    return ToastRef;
}());
export { ToastRef };
var ToastInjector = (function () {
    function ToastInjector(_dialogRef, _data, _parentInjector) {
        this._dialogRef = _dialogRef;
        this._data = _data;
        this._parentInjector = _parentInjector;
    }
    ToastInjector.prototype.get = function (token, notFoundValue) {
        if (token === ToastRef) {
            return this._dialogRef;
        }
        if (token === ToastData && this._data) {
            return this._data;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return ToastInjector;
}());
export { ToastInjector };
//# sourceMappingURL=toastInjector.js.map