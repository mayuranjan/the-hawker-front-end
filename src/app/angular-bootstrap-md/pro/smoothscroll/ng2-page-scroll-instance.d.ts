import { EventEmitter } from '@angular/core';
import { EasingLogic, PageScrollTarget, PageScrollingViews } from './ng2-page-scroll-config';
export interface PageScrollOptions {
    document: Document;
    scrollTarget: PageScrollTarget;
    scrollingViews?: PageScrollingViews[];
    namespace?: string;
    verticalScrolling?: boolean;
    advancedInlineOffsetCalculation?: boolean;
    pageScrollOffset?: number;
    pageScrollInterruptible?: boolean;
    pageScrollEasingLogic?: EasingLogic;
    pageScrollDuration?: number;
    pageScrollSpeed?: number;
    pageScrollFinishListener?: EventEmitter<boolean>;
}
export declare class PageScrollInstance {
    private _namespace;
    private document;
    private _scrollingViews;
    private _isInlineScrolling;
    private _scrollTarget;
    private _verticalScrolling;
    private _offset;
    private _duration;
    private _speed;
    private _easingLogic;
    private _interruptible;
    private _interruptListener;
    private _advancedInlineOffsetCalculation;
    private _pageScrollFinish;
    private _startScrollPosition;
    private _targetScrollPosition;
    private _distanceToScroll;
    private _startTime;
    private _endTime;
    private _executionDuration;
    private _interruptListenersAttached;
    private _timer;
    static simpleInstance(document: Document, scrollTarget: PageScrollTarget, namespace?: string): PageScrollInstance;
    static newInstance(options: PageScrollOptions): PageScrollInstance;
    static simpleDirectionInstance(document: Document, scrollTarget: PageScrollTarget, verticalScrolling: boolean, namespace?: string): PageScrollInstance;
    static simpleInlineInstance(document: Document, scrollTarget: PageScrollTarget, scrollingView: PageScrollingViews, namespace?: string): PageScrollInstance;
    static simpleInlineDirectionInstance(document: Document, scrollTarget: PageScrollTarget, scrollingView: PageScrollingViews, verticalScrolling: boolean, namespace?: string): PageScrollInstance;
    static advancedInstance(document: Document, scrollTarget: PageScrollTarget, scrollingViews?: PageScrollingViews[], namespace?: string, verticalScrolling?: boolean, pageScrollOffset?: number, pageScrollInterruptible?: boolean, pageScrollEasingLogic?: EasingLogic, pageScrollDuration?: number, pageScrollFinishListener?: EventEmitter<boolean>): PageScrollInstance;
    constructor(namespace: string, document: Document);
    getScrollPropertyValue(scrollingView: any): number;
    extractScrollTargetPosition(): {
        top: number;
        left: number;
    };
    getCurrentOffset(): number;
    setScrollPosition(position: number): boolean;
    fireEvent(value: boolean): void;
    attachInterruptListeners(interruptReporter: InterruptReporter): void;
    detachInterruptListeners(): void;
    readonly namespace: string;
    readonly scrollTarget: PageScrollTarget;
    readonly verticalScrolling: boolean;
    readonly scrollingViews: any[];
    startScrollPosition: number;
    targetScrollPosition: number;
    distanceToScroll: number;
    executionDuration: number;
    readonly duration: number;
    readonly speed: number;
    readonly easingLogic: EasingLogic;
    readonly interruptible: boolean;
    startTime: number;
    endTime: number;
    timer: any;
    readonly interruptListenersAttached: boolean;
}
export interface InterruptReporter {
    report: {
        (event: Event, pageScrollInstance: PageScrollInstance): void;
    };
}
