export declare abstract class EasingLogic {
    abstract ease(t: number, b: number, c: number, d: number): number;
}
export declare type PageScrollTarget = HTMLElement | string;
export declare type PageScrollingViews = HTMLElement | Document | HTMLBodyElement | Node;
export declare class PageScrollConfig {
    static _interval: number;
    static _minScrollDistance: number;
    static _defaultNamespace: string;
    static defaultIsVerticalScrolling: boolean;
    static _logLevel: number;
    static defaultDuration: number;
    static defaultScrollOffset: number;
    static defaultAdvancedInlineOffsetCalculation: boolean;
    static _interruptEvents: string[];
    static _interruptKeys: number[];
    static defaultInterruptible: boolean;
    private static _easingLogic;
    static defaultEasingLogic: EasingLogic;
}
