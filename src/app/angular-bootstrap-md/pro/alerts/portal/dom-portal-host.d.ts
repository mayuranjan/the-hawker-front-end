import { ComponentFactoryResolver, ComponentRef, ApplicationRef } from '@angular/core';
import { BasePortalHost, ComponentPortal } from './portal';
export declare class DomPortalHost extends BasePortalHost {
    private _hostDomElement;
    private _componentFactoryResolver;
    private _appRef;
    constructor(_hostDomElement: Element, _componentFactoryResolver: ComponentFactoryResolver, _appRef: ApplicationRef);
    attachComponentPortal<T>(portal: ComponentPortal<T>, newestOnTop: boolean): ComponentRef<T>;
    private _getComponentRootNode(componentRef);
}
