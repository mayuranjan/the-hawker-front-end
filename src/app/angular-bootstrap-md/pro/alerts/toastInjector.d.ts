import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OverlayRef } from './overlay/overlay-ref';
import { ToastData } from './toastrConfig';
export declare class ToastRef<T> {
    private _overlayRef;
    componentInstance: T;
    private _afterClosed;
    private _activate;
    private _manualClose;
    constructor(_overlayRef: OverlayRef);
    manualClose(): void;
    manualClosed(): Observable<any>;
    close(): void;
    afterClosed(): Observable<any>;
    isInactive(): boolean;
    activate(): void;
    afterActivate(): Observable<any>;
}
export declare class ToastInjector implements Injector {
    private _dialogRef;
    private _data;
    private _parentInjector;
    constructor(_dialogRef: ToastRef<any>, _data: ToastData, _parentInjector: Injector);
    get(token: any, notFoundValue?: any): any;
}
