import { Injectable, isDevMode } from '@angular/core';
import { PageScrollConfig } from './ng2-page-scroll-config';
import { PageScrollUtilService as Util } from './ng2-page-scroll-util.service';
var PageScrollService = (function () {
    function PageScrollService() {
        var _this = this;
        this.runningInstances = [];
        this.onInterrupted = {
            report: function (event, pageScrollInstance) {
                if (!pageScrollInstance.interruptible) {
                    return;
                }
                var shouldStop = true;
                if (event.type === 'keyup') {
                    if (PageScrollConfig._interruptKeys.indexOf(event.keyCode) === -1) {
                        shouldStop = false;
                    }
                }
                else if (event.type === 'mousedown') {
                    if (!pageScrollInstance.scrollingViews.some(function (scrollingView) { return scrollingView.contains(event.target); })) {
                        shouldStop = false;
                    }
                }
                if (shouldStop) {
                    _this.stopAll(pageScrollInstance.namespace);
                }
            }
        };
        if (PageScrollService.instanceCounter > 0 && isDevMode()) {
            console.warn('An instance of PageScrollService already exists, usually ' +
                'including one provider should be enough, so double check.');
        }
        PageScrollService.instanceCounter++;
    }
    PageScrollService.prototype.stopInternal = function (interrupted, pageScrollInstance) {
        var index = this.runningInstances.indexOf(pageScrollInstance);
        if (index >= 0) {
            this.runningInstances.splice(index, 1);
        }
        if (pageScrollInstance.interruptListenersAttached) {
            pageScrollInstance.detachInterruptListeners();
        }
        if (pageScrollInstance.timer) {
            clearInterval(pageScrollInstance.timer);
            pageScrollInstance.timer = undefined;
            pageScrollInstance.fireEvent(!interrupted);
            return true;
        }
        return false;
    };
    PageScrollService.prototype.start = function (pageScrollInstance) {
        var _this = this;
        this.stopAll(pageScrollInstance.namespace);
        if (pageScrollInstance.scrollingViews === null || pageScrollInstance.scrollingViews.length === 0) {
            if (isDevMode()) {
                console.warn('No scrollingViews specified, this ng2-page-scroll does not know which DOM elements to scroll');
            }
            return;
        }
        var startScrollPositionFound = false;
        pageScrollInstance.startScrollPosition = 0;
        pageScrollInstance.scrollingViews.forEach(function (scrollingView) {
            if (Util.isUndefinedOrNull(scrollingView)) {
                return;
            }
            var scrollPosition = pageScrollInstance.getScrollPropertyValue(scrollingView);
            if (!startScrollPositionFound && scrollPosition) {
                pageScrollInstance.startScrollPosition = scrollPosition;
                startScrollPositionFound = true;
            }
        });
        var pageScrollOffset = pageScrollInstance.getCurrentOffset();
        var scrollTargetPosition = pageScrollInstance.extractScrollTargetPosition();
        pageScrollInstance.targetScrollPosition = Math.round((pageScrollInstance.verticalScrolling ? scrollTargetPosition.top : scrollTargetPosition.left) - pageScrollOffset);
        pageScrollInstance.distanceToScroll = pageScrollInstance.targetScrollPosition - pageScrollInstance.startScrollPosition;
        if (isNaN(pageScrollInstance.distanceToScroll)) {
            if (isDevMode()) {
                console.log('Scrolling not possible, as we can\'t find the specified target');
            }
            pageScrollInstance.fireEvent(false);
            return;
        }
        var allReadyAtDestination = Math.abs(pageScrollInstance.distanceToScroll) < PageScrollConfig._minScrollDistance;
        pageScrollInstance.executionDuration = pageScrollInstance.duration;
        if (!Util.isUndefinedOrNull(pageScrollInstance.speed) && Util.isUndefinedOrNull(pageScrollInstance.duration)) {
            pageScrollInstance.executionDuration = pageScrollInstance.distanceToScroll / pageScrollInstance.speed * 1000;
        }
        var tooShortInterval = pageScrollInstance.executionDuration <= PageScrollConfig._interval;
        if (allReadyAtDestination || tooShortInterval) {
            if (isDevMode()) {
                if (allReadyAtDestination) {
                    console.log('Scrolling not possible, as we can\'t get any closer to the destination');
                }
                else {
                    console.log('Scroll duration shorter that interval length, jumping to target');
                }
            }
            pageScrollInstance.setScrollPosition(pageScrollInstance.targetScrollPosition);
            pageScrollInstance.fireEvent(true);
            return;
        }
        if (pageScrollInstance.interruptible ||
            (Util.isUndefinedOrNull(pageScrollInstance.interruptible) && PageScrollConfig.defaultInterruptible)) {
            pageScrollInstance.attachInterruptListeners(this.onInterrupted);
        }
        pageScrollInstance.startTime = new Date().getTime();
        pageScrollInstance.endTime = pageScrollInstance.startTime + pageScrollInstance.executionDuration;
        pageScrollInstance.timer = setInterval(function (_pageScrollInstance) {
            var currentTime = new Date().getTime();
            var newScrollPosition;
            var stopNow = false;
            if (_pageScrollInstance.endTime <= currentTime) {
                newScrollPosition = _pageScrollInstance.targetScrollPosition;
                stopNow = true;
            }
            else {
                newScrollPosition = Math.round(_pageScrollInstance.easingLogic.ease(currentTime - _pageScrollInstance.startTime, _pageScrollInstance.startScrollPosition, _pageScrollInstance.distanceToScroll, _pageScrollInstance.executionDuration));
            }
            if (!_pageScrollInstance.setScrollPosition(newScrollPosition)) {
                stopNow = true;
            }
            if (stopNow) {
                _this.stopInternal(false, _pageScrollInstance);
            }
        }, PageScrollConfig._interval, pageScrollInstance);
        this.runningInstances.push(pageScrollInstance);
    };
    PageScrollService.prototype.stopAll = function (namespace) {
        if (this.runningInstances.length > 0) {
            var stoppedSome = false;
            for (var i = 0; i < this.runningInstances.length; ++i) {
                var pageScrollInstance = this.runningInstances[i];
                if (Util.isUndefinedOrNull(namespace) || namespace.length === 0 ||
                    pageScrollInstance.namespace === namespace) {
                    stoppedSome = true;
                    this.stopInternal(true, pageScrollInstance);
                    i--;
                }
            }
            return stoppedSome;
        }
        return false;
    };
    PageScrollService.prototype.stop = function (pageScrollInstance) {
        return this.stopInternal(true, pageScrollInstance);
    };
    return PageScrollService;
}());
export { PageScrollService };
PageScrollService.instanceCounter = 0;
PageScrollService.decorators = [
    { type: Injectable },
];
PageScrollService.ctorParameters = function () { return []; };
//# sourceMappingURL=ng2-page-scroll.service.js.map