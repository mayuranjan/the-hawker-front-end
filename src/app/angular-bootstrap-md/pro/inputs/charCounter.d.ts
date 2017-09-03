import { OnInit, ElementRef, Renderer } from '@angular/core';
export declare class charCounter implements OnInit {
    private _elRef;
    private _renderer;
    maxChar: number;
    textContainer: any;
    constructor(_elRef: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    onKeyUp(): void;
    hide(): void;
    show(): void;
}
