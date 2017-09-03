import { OnDestroy, ApplicationRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { ToastConfig, ToastData } from './toastrConfig';
import { ToastrService } from './toastrService';
import { ToastRef } from './toastInjector';
export declare class Toast implements OnDestroy {
    protected toastrService: ToastrService;
    data: ToastData;
    protected toastRef: ToastRef<any>;
    protected appRef: ApplicationRef;
    protected sanitizer: DomSanitizer;
    toastId: number;
    message: string | SafeHtml;
    title: string;
    options: ToastConfig;
    width: number;
    toastClasses: string;
    state: string;
    private timeout;
    private intervalId;
    private hideTime;
    private sub;
    private sub1;
    onTap: Subject<any>;
    onAction: Subject<any>;
    constructor(toastrService: ToastrService, data: ToastData, toastRef: ToastRef<any>, appRef: ApplicationRef, sanitizer: DomSanitizer);
    ngOnDestroy(): void;
    activateToast(): void;
    updateProgress(): void;
    remove(): void;
    tapToast(): void;
    stickAround(): void;
    delayedHideToast(): void;
}