import { ElementRef, Renderer, OnInit } from "@angular/core";
import { CompleterItem } from "../components/completerItemComponent";
import { CtrDropdown, CtrRowElement } from "./dropdownDirective";
export declare class CtrRow implements CtrRowElement, OnInit {
    private el;
    private renderer;
    private dropdown;
    private selected;
    private _rowIndex;
    private _item;
    constructor(el: ElementRef, renderer: Renderer, dropdown: CtrDropdown);
    ngOnInit(): void;
    ctrRow: number;
    dataItem: CompleterItem;
    onClick(event: any): void;
    onMouseEnter(event: any): void;
    setHighlighted(selected: boolean): void;
    getNativeElement(): any;
    getDataItem(): CompleterItem;
}
