import { ElementRef, Renderer } from '@angular/core';
export declare class SBItemBody {
    private renderer;
    height: String;
    bodyEl: ElementRef;
    constructor(renderer: Renderer);
    toggle(collapsed: boolean): void;
}
