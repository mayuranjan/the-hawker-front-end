import { SBItemBody } from './sb-item-body';
import { SqueezeBox } from './squeezebox';
export declare class SBItem {
    private squeezebox;
    collapsed: boolean;
    body: SBItemBody;
    constructor(squeezebox: SqueezeBox);
    ngAfterViewInit(): void;
    toggle(collapsed: boolean): void;
    applyToggle(collapsed: boolean): void;
}
