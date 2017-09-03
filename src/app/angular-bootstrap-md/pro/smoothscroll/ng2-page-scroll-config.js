var EasingLogic = (function () {
    function EasingLogic() {
    }
    return EasingLogic;
}());
export { EasingLogic };
var PageScrollConfig = (function () {
    function PageScrollConfig() {
    }
    Object.defineProperty(PageScrollConfig, "defaultEasingLogic", {
        get: function () {
            return PageScrollConfig._easingLogic;
        },
        set: function (easingLogic) {
            PageScrollConfig._easingLogic = easingLogic;
        },
        enumerable: true,
        configurable: true
    });
    return PageScrollConfig;
}());
export { PageScrollConfig };
PageScrollConfig._interval = 10;
PageScrollConfig._minScrollDistance = 2;
PageScrollConfig._defaultNamespace = 'default';
PageScrollConfig.defaultIsVerticalScrolling = true;
PageScrollConfig._logLevel = 2;
PageScrollConfig.defaultDuration = 1250;
PageScrollConfig.defaultScrollOffset = 0;
PageScrollConfig.defaultAdvancedInlineOffsetCalculation = false;
PageScrollConfig._interruptEvents = ['mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'];
PageScrollConfig._interruptKeys = [33, 34, 35, 36, 38, 40];
PageScrollConfig.defaultInterruptible = true;
PageScrollConfig._easingLogic = {
    ease: function (t, b, c, d) {
        return c * t / d + b;
    }
};
//# sourceMappingURL=ng2-page-scroll-config.js.map