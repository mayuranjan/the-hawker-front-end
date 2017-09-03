import { EventEmitter, TemplateRef, ElementRef, OnInit } from '@angular/core';
import { TabsetComponent } from './tabsetComponent';
export declare class TabDirective implements OnInit {
    heading: string;
    disabled: boolean;
    removable: boolean;
    customClass: string;
    active: boolean;
    select: EventEmitter<TabDirective>;
    deselect: EventEmitter<TabDirective>;
    removed: EventEmitter<TabDirective>;
    addClass: boolean;
    test: boolean;
    headingRef: TemplateRef<any>;
    tabset: TabsetComponent;
    el: ElementRef;
    protected _active: boolean;
    constructor(tabset: TabsetComponent, el: ElementRef);
    ngOnInit(): void;
    protected hasClass(el: any, className: any): any;
    protected classAdd(el: any, className: any): void;
    protected removeClass(el: any, className: any): void;
}
