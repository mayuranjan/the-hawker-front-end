import { EventEmitter } from '@angular/core';
import { PageScrollConfig } from './ng2-page-scroll-config';
import { PageScrollUtilService as Util } from './ng2-page-scroll-util.service';
var PageScrollInstance = (function () {
    function PageScrollInstance(namespace, document) {
        this._namespace = PageScrollConfig._defaultNamespace;
        this._verticalScrolling = PageScrollConfig.defaultIsVerticalScrolling;
        this._offset = PageScrollConfig.defaultScrollOffset;
        this._duration = PageScrollConfig.defaultDuration;
        this._easingLogic = PageScrollConfig.defaultEasingLogic;
        this._interruptible = PageScrollConfig.defaultInterruptible;
        this._advancedInlineOffsetCalculation = PageScrollConfig.defaultAdvancedInlineOffsetCalculation;
        this._pageScrollFinish = new EventEmitter();
        this._startScrollPosition = 0;
        this._interruptListenersAttached = false;
        this._timer = null;
        this._namespace = namespace;
        this.document = document;
    }
    PageScrollInstance.simpleInstance = function (document, scrollTarget, namespace) {
        return PageScrollInstance.newInstance({
            document: document,
            scrollTarget: scrollTarget,
            namespace: namespace
        });
    };
    PageScrollInstance.newInstance = function (options) {
        if (Util.isUndefinedOrNull(options.namespace) || options.namespace.length <= 0) {
            options.namespace = PageScrollConfig._defaultNamespace;
        }
        var pageScrollInstance = new PageScrollInstance(options.namespace, document);
        if (Util.isUndefinedOrNull(options.scrollingViews) || options.scrollingViews.length === 0) {
            pageScrollInstance._isInlineScrolling = false;
            pageScrollInstance._scrollingViews = [document.documentElement, document.body, document.body.parentNode];
        }
        else {
            pageScrollInstance._isInlineScrolling = true;
            pageScrollInstance._scrollingViews = options.scrollingViews;
        }
        pageScrollInstance._scrollTarget = options.scrollTarget;
        if (!Util.isUndefinedOrNull(options.verticalScrolling)) {
            pageScrollInstance._verticalScrolling = options.verticalScrolling;
        }
        if (!Util.isUndefinedOrNull(options.pageScrollOffset)) {
            pageScrollInstance._offset = options.pageScrollOffset;
        }
        if (!Util.isUndefinedOrNull(options.pageScrollEasingLogic)) {
            pageScrollInstance._easingLogic = options.pageScrollEasingLogic;
        }
        if (Util.isUndefinedOrNull(options.pageScrollDuration) && !Util.isUndefinedOrNull(options.pageScrollSpeed)) {
            pageScrollInstance._speed = options.pageScrollSpeed;
            pageScrollInstance._duration = undefined;
        }
        else if (!Util.isUndefinedOrNull(options.pageScrollDuration)) {
            pageScrollInstance._duration = options.pageScrollDuration;
        }
        if (!Util.isUndefinedOrNull(options.pageScrollFinishListener)) {
            pageScrollInstance._pageScrollFinish = options.pageScrollFinishListener;
        }
        pageScrollInstance._interruptible = options.pageScrollInterruptible ||
            (Util.isUndefinedOrNull(options.pageScrollInterruptible) && PageScrollConfig.defaultInterruptible);
        pageScrollInstance._advancedInlineOffsetCalculation = options.advancedInlineOffsetCalculation ||
            (Util.isUndefinedOrNull(options.advancedInlineOffsetCalculation) &&
                PageScrollConfig.defaultAdvancedInlineOffsetCalculation);
        return pageScrollInstance;
    };
    PageScrollInstance.simpleDirectionInstance = function (document, scrollTarget, verticalScrolling, namespace) {
        return PageScrollInstance.newInstance({
            document: document,
            scrollTarget: scrollTarget,
            namespace: namespace,
            verticalScrolling: verticalScrolling,
        });
    };
    PageScrollInstance.simpleInlineInstance = function (document, scrollTarget, scrollingView, namespace) {
        return PageScrollInstance.newInstance({
            document: document,
            scrollTarget: scrollTarget,
            scrollingViews: [scrollingView],
            verticalScrolling: true,
            namespace: namespace
        });
    };
    PageScrollInstance.simpleInlineDirectionInstance = function (document, scrollTarget, scrollingView, verticalScrolling, namespace) {
        return PageScrollInstance.newInstance({
            document: document,
            scrollTarget: scrollTarget,
            scrollingViews: [scrollingView],
            namespace: namespace,
            verticalScrolling: verticalScrolling,
        });
    };
    PageScrollInstance.advancedInstance = function (document, scrollTarget, scrollingViews, namespace, verticalScrolling, pageScrollOffset, pageScrollInterruptible, pageScrollEasingLogic, pageScrollDuration, pageScrollFinishListener) {
        return PageScrollInstance.newInstance({
            document: document,
            scrollTarget: scrollTarget,
            scrollingViews: scrollingViews,
            namespace: namespace,
            verticalScrolling: verticalScrolling,
            pageScrollOffset: pageScrollOffset,
            pageScrollInterruptible: pageScrollInterruptible,
            pageScrollEasingLogic: pageScrollEasingLogic,
            pageScrollDuration: pageScrollDuration,
            pageScrollFinishListener: pageScrollFinishListener
        });
    };
    PageScrollInstance.prototype.getScrollPropertyValue = function (scrollingView) {
        if (!this.verticalScrolling) {
            return scrollingView.scrollLeft;
        }
        return scrollingView.scrollTop;
    };
    PageScrollInstance.prototype.extractScrollTargetPosition = function () {
        var scrollTargetElement;
        if (typeof this._scrollTarget === 'string') {
            scrollTargetElement = this.document.getElementById(this._scrollTarget.substr(1));
        }
        else {
            scrollTargetElement = this._scrollTarget;
        }
        if (scrollTargetElement === null || scrollTargetElement === undefined) {
            return { top: NaN, left: NaN };
        }
        if (this._isInlineScrolling) {
            var position = { top: scrollTargetElement.offsetTop, left: scrollTargetElement.offsetLeft };
            if (this._advancedInlineOffsetCalculation && this.scrollingViews.length === 1) {
                var accumulatedParentsPos = { top: 0, left: 0 };
                var theWindow = scrollTargetElement.ownerDocument.defaultView;
                var parentFound = false;
                var parent_1 = scrollTargetElement.parentElement;
                while (!parentFound && !Util.isUndefinedOrNull(parent_1)) {
                    if (theWindow.getComputedStyle(parent_1).getPropertyValue('position') === 'relative') {
                        accumulatedParentsPos.top += parent_1.offsetTop;
                        accumulatedParentsPos.left += parent_1.offsetLeft;
                    }
                    parent_1 = parent_1.parentElement;
                    parentFound = parent_1 === this.scrollingViews[0];
                }
                if (parentFound) {
                    position.top += accumulatedParentsPos.top;
                    position.left += accumulatedParentsPos.left;
                }
                else {
                    if (PageScrollConfig._logLevel >= 2) {
                        console.warn('Unable to find nested scrolling targets parent!');
                    }
                }
            }
            return position;
        }
        return Util.extractElementPosition(this.document, scrollTargetElement);
    };
    PageScrollInstance.prototype.getCurrentOffset = function () {
        return this._offset;
    };
    PageScrollInstance.prototype.setScrollPosition = function (position) {
        var _this = this;
        if (PageScrollConfig._logLevel >= 5) {
            console.warn('Scroll Position: ' + position);
        }
        return this.scrollingViews.reduce(function (oneAlreadyWorked, scrollingView) {
            var startScrollPropertyValue = _this.getScrollPropertyValue(scrollingView);
            if (scrollingView && !Util.isUndefinedOrNull(startScrollPropertyValue)) {
                var scrollDistance = Math.abs(startScrollPropertyValue - position);
                var isSmallMovement = scrollDistance < PageScrollConfig._minScrollDistance;
                if (!_this.verticalScrolling) {
                    scrollingView.scrollLeft = position;
                }
                else {
                    scrollingView.scrollTop = position;
                }
                if (isSmallMovement || scrollDistance > Math.abs(_this.getScrollPropertyValue(scrollingView) - position)) {
                    return true;
                }
            }
            return oneAlreadyWorked;
        }, false);
    };
    PageScrollInstance.prototype.fireEvent = function (value) {
        if (this._pageScrollFinish) {
            this._pageScrollFinish.emit(value);
        }
    };
    PageScrollInstance.prototype.attachInterruptListeners = function (interruptReporter) {
        var _this = this;
        if (this._interruptListenersAttached) {
            this.detachInterruptListeners();
        }
        this._interruptListener = function (event) {
            interruptReporter.report(event, _this);
        };
        PageScrollConfig._interruptEvents.forEach(function (event) { return _this.document.body.addEventListener(event, _this._interruptListener); });
        this._interruptListenersAttached = true;
    };
    PageScrollInstance.prototype.detachInterruptListeners = function () {
        var _this = this;
        PageScrollConfig._interruptEvents.forEach(function (event) { return _this.document.body.removeEventListener(event, _this._interruptListener); });
        this._interruptListenersAttached = false;
    };
    Object.defineProperty(PageScrollInstance.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "scrollTarget", {
        get: function () {
            return this._scrollTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "verticalScrolling", {
        get: function () {
            return this._verticalScrolling;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "scrollingViews", {
        get: function () {
            return this._scrollingViews;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "startScrollPosition", {
        get: function () {
            return this._startScrollPosition;
        },
        set: function (value) {
            this._startScrollPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "targetScrollPosition", {
        get: function () {
            return this._targetScrollPosition;
        },
        set: function (value) {
            this._targetScrollPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "distanceToScroll", {
        get: function () {
            return this._distanceToScroll;
        },
        set: function (value) {
            this._distanceToScroll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "executionDuration", {
        get: function () {
            return this._executionDuration;
        },
        set: function (value) {
            this._executionDuration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "easingLogic", {
        get: function () {
            return this._easingLogic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "interruptible", {
        get: function () {
            return this._interruptible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        set: function (value) {
            this._startTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        set: function (value) {
            this._endTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "timer", {
        get: function () {
            return this._timer;
        },
        set: function (value) {
            this._timer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "interruptListenersAttached", {
        get: function () {
            return this._interruptListenersAttached;
        },
        enumerable: true,
        configurable: true
    });
    return PageScrollInstance;
}());
export { PageScrollInstance };
//# sourceMappingURL=ng2-page-scroll-instance.js.map