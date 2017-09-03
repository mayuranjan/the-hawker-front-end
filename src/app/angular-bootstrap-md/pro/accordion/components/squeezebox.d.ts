import { QueryList } from '@angular/core';
import { SBItem } from './sb-item';
export declare class SqueezeBox {
    multiple: boolean;
    items: QueryList<SBItem>;
    constructor();
    didItemToggled(item: SBItem): void;
}
