import { ComponentFactoryResolver, ApplicationRef, NgZone } from '@angular/core';
import { OverlayRef } from './overlay-ref';
import { OverlayContainer } from './overlay-container';
import { ToastContainerDirective } from '../toastDirective';
export declare class Overlay {
    private _overlayContainer;
    private _componentFactoryResolver;
    private _appRef;
    private _ngZone;
    private _paneElements;
    constructor(_overlayContainer: OverlayContainer, _componentFactoryResolver: ComponentFactoryResolver, _appRef: ApplicationRef, _ngZone: NgZone);
    create(positionClass: string, overlayContainer?: ToastContainerDirective): OverlayRef;
    getPaneElement(positionClass: string, overlayContainer?: ToastContainerDirective): HTMLElement;
    private _createPaneElement(positionClass, overlayContainer?);
    private _createPortalHost(pane);
    private _createOverlayRef(pane);
}
export declare const OVERLAY_PROVIDERS: (typeof OverlayContainer | typeof Overlay)[];
