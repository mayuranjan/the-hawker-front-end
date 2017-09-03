import { OnDestroy, OnInit } from '@angular/core';
import { ProgressDirective } from './progressDirective';
export declare class BarComponent implements OnInit, OnDestroy {
    max: number;
    type: string;
    value: number;
    percent: number;
    transition: string;
    progress: ProgressDirective;
    protected _value: number;
    constructor(progress: ProgressDirective);
    ngOnInit(): void;
    ngOnDestroy(): void;
    recalculatePercentage(): void;
}
