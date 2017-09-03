export declare class MdProgressBar {
    color: 'primary' | 'accent' | 'warn';
    private _value;
    value: number;
    private _bufferValue;
    bufferValue: number;
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    _primaryTransform(): {
        transform: string;
    };
    _bufferTransform(): {
        transform: string;
    };
}
