import { ElementRef, Renderer, AfterViewInit } from '@angular/core';
export declare class DoubleNavbar implements AfterViewInit {
    el: ElementRef;
    renderer: Renderer;
    windwosWidth: number;
    shown: boolean;
    sideNav: ElementRef;
    navbar: ElementRef;
    isNavbarFixed: boolean;
    isSidenavFixed: boolean;
    overlay: any;
    navbarClass: string;
    isScrolling: boolean;
    constructor(el: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
    windwosResize(): void;
    showSideNav(): void;
    hiddeSideNav(): void;
    showOverlay(): void;
    hideOverlay(): void;
    scrolling(event: any): void;
}
