import { ElementRef } from '@angular/core';
export declare class ProgressSpinnerComponent {
    el: ElementRef;
    addClass: String;
    spinnerType: string;
    spinnerColor: string;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    spinerRun(): void;
}
