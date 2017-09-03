import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgUploaderService, UploadOutput } from '../classes/ngx-uploader.class';
export declare class NgFileSelectDirective implements OnInit, OnDestroy {
    private platform_id;
    private elementRef;
    uploadInput: EventEmitter<any>;
    uploadOutput: EventEmitter<UploadOutput>;
    upload: NgUploaderService;
    isServer: boolean;
    el: HTMLInputElement;
    constructor(platform_id: any, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    fileListener: () => void;
}
