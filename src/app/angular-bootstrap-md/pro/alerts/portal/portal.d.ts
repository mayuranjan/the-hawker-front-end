import { ViewContainerRef, ComponentRef, Injector } from '@angular/core';
export interface ComponentType<T> {
    new (...args: any[]): T;
}
export declare class ComponentPortal<T> {
    private _attachedHost;
    component: ComponentType<T>;
    viewContainerRef: ViewContainerRef;
    injector: Injector;
    constructor(component: ComponentType<T>, injector: Injector);
    attach(host: BasePortalHost, newestOnTop: boolean): ComponentRef<any>;
    detach(): void;
    readonly isAttached: boolean;
    setAttachedHost(host: BasePortalHost): void;
}
export declare abstract class BasePortalHost {
    private _attachedPortal;
    private _disposeFn;
    attach(portal: ComponentPortal<any>, newestOnTop: boolean): ComponentRef<any>;
    abstract attachComponentPortal<T>(portal: ComponentPortal<T>, newestOnTop: boolean): ComponentRef<T>;
    detach(): void;
    setDisposeFn(fn: () => void): void;
}
