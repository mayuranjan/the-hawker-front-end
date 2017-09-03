import { ComponentFactoryResolver, Injectable, ApplicationRef, NgZone } from '@angular/core';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayRef } from './overlay-ref';
import { OverlayContainer } from './overlay-container';
var Overlay = (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _appRef, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._ngZone = _ngZone;
        this._paneElements = {};
    }
    Overlay.prototype.create = function (positionClass, overlayContainer) {
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
    };
    Overlay.prototype.getPaneElement = function (positionClass, overlayContainer) {
        if (!this._paneElements[positionClass]) {
            this._paneElements[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements[positionClass];
    };
    Overlay.prototype._createPaneElement = function (positionClass, overlayContainer) {
        var pane = document.createElement('div');
        pane.id = 'toast-container';
        pane.classList.add(positionClass);
        if (!overlayContainer) {
            this._overlayContainer.getContainerElement().appendChild(pane);
        }
        else {
            overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
    };
    Overlay.prototype._createPortalHost = function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
    };
    Overlay.prototype._createOverlayRef = function (pane) {
        return new OverlayRef(this._createPortalHost(pane), pane, this._ngZone);
    };
    return Overlay;
}());
export { Overlay };
Overlay.decorators = [
    { type: Injectable },
];
Overlay.ctorParameters = function () { return [
    { type: OverlayContainer, },
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: NgZone, },
]; };
export var OVERLAY_PROVIDERS = [
    Overlay,
    OverlayContainer,
];
//# sourceMappingURL=overlay.js.map