import { IOption } from './optionInterface';
export declare class Option {
    wrappedOption: IOption;
    disabled: boolean;
    highlighted: boolean;
    selected: boolean;
    shown: boolean;
    group: boolean;
    constructor(option: IOption);
    readonly value: string;
    readonly label: string;
    readonly icon: string;
}
