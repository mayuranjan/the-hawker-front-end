import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgUploaderService, UploadOutput, UploadInput } from '../classes/ngx-uploader.class';
export declare class NgFileDropDirective implements OnInit, OnDestroy {
    private platform_id;
    private elementRef;
    uploadInput: EventEmitter<UploadInput>;
    uploadOutput: EventEmitter<UploadOutput>;
    upload: NgUploaderService;
    isServer: boolean;
    el: HTMLInputElement;
    constructor(platform_id: any, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    stopEvent: (e: Event) => void;
    onDrop(e: any): void;
    onDragOver(e: Event): void;
    onDragLeave(e: Event): void;
}
