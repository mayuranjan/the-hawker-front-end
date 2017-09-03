import { NgZone, ComponentRef } from '@angular/core';
import { BasePortalHost, ComponentPortal } from '../portal/portal';
export declare class OverlayRef {
    private _portalHost;
    private _pane;
    private _ngZone;
    constructor(_portalHost: BasePortalHost, _pane: HTMLElement, _ngZone: NgZone);
    attach(portal: ComponentPortal<any>, newestOnTop: boolean): ComponentRef<any>;
    detach(): void;
}
