import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CONTAINER_QUERY, COMPLETE_CLASS_NAME, TYPE_ERROR_CONTAINER_WAS_NOT_FOUND_MESSAGE, EMULATE_ELEMENT_NAME } from './preloaderConstants';
var NgSpinningPreloader = (function () {
    function NgSpinningPreloader(document) {
        this.document = document;
        this.container = this.document.querySelector(CONTAINER_QUERY);
    }
    NgSpinningPreloader.prototype.start = function () {
        this.container.classList.remove(COMPLETE_CLASS_NAME);
    };
    NgSpinningPreloader.prototype.stop = function () {
        this.container.classList.add(COMPLETE_CLASS_NAME);
    };
    Object.defineProperty(NgSpinningPreloader.prototype, "container", {
        get: function () {
            return this._container;
        },
        set: function (element) {
            if (!element) {
            }
            this._container = element || this.document.createElement(EMULATE_ELEMENT_NAME);
        },
        enumerable: true,
        configurable: true
    });
    NgSpinningPreloader.errorHandler = function () {
        throw new TypeError(TYPE_ERROR_CONTAINER_WAS_NOT_FOUND_MESSAGE);
    };
    return NgSpinningPreloader;
}());
export { NgSpinningPreloader };
NgSpinningPreloader.decorators = [
    { type: Injectable },
];
NgSpinningPreloader.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
]; };
//# sourceMappingURL=preloaderService.js.map