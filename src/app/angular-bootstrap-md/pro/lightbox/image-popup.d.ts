import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'hammerjs';
export declare class ImageModal implements OnInit {
    element: ElementRef;
    _element: any;
    opened: boolean;
    imgSrc: string;
    currentImageIndex: number;
    loading: boolean;
    showRepeat: boolean;
    isMobile: boolean;
    openModalWindow: any;
    modalImages: any;
    imagePointer: number;
    fullscreen: boolean;
    zoom: boolean;
    smooth: boolean;
    type: String;
    cancelEvent: EventEmitter<any>;
    constructor(element: ElementRef);
    zoomed: string;
    toggleZoomed(): void;
    toggleRestart(): void;
    ngOnInit(): void;
    closeGallery(): void;
    prevImage(): void;
    nextImage(): void;
    openGallery(index: any): void;
    fullScreen(): any;
    readonly is_iPhone_or_iPod: boolean;
    keyboardControl(event: KeyboardEvent): void;
    SWIPE_ACTION: {
        LEFT: string;
        RIGHT: string;
    };
    swipe(event: any, action?: String): void;
}
