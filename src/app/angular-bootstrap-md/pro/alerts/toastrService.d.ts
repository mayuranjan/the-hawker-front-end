import { Injector, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Overlay } from './overlay/overlay';
import { ToastConfig, ToastrConfig } from './toastrConfig';
import { ToastRef } from './toastInjector';
import { ToastContainerDirective } from './toastDirective';
export interface ActiveToast {
    toastId?: number;
    message?: string;
    portal?: ComponentRef<any>;
    toastRef?: ToastRef<any>;
    onShown?: Observable<any>;
    onHidden?: Observable<any>;
    onTap?: Observable<any>;
    onAction?: Observable<any>;
}
export declare class ToastrService {
    toastrConfig: ToastrConfig;
    private overlay;
    private _injector;
    private index;
    private toasts;
    private previousToastMessage;
    private currentlyActive;
    overlayContainer: ToastContainerDirective;
    constructor(toastrConfig: ToastrConfig, overlay: Overlay, _injector: Injector);
    show(message: string, title?: string, optionsOverride?: ToastConfig, type?: string): ActiveToast;
    success(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    error(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    info(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    warning(message: string, title?: string, optionsOverride?: ToastConfig): ActiveToast;
    createToastConfig(optionsOverride: ToastConfig): ToastConfig;
    clear(toastId?: number): void;
    remove(toastId: number): boolean;
    private _findToast(toastId);
    private isDuplicate(message);
    private _buildNotification(toastType, message, title, optionsOverride?);
}
