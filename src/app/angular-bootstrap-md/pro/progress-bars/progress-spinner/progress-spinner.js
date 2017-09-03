var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, HostBinding, ChangeDetectionStrategy, Input, ElementRef, NgZone, Renderer, Directive } from '@angular/core';
var DEGREE_IN_RADIANS = Math.PI / 180;
var DURATION_INDETERMINATE = 667;
var DURATION_DETERMINATE = 225;
var startIndeterminate = 3;
var endIndeterminate = 80;
var MAX_ANGLE = 359.99 / 100;
var MdProgressSpinnerCssMatStyler = (function () {
    function MdProgressSpinnerCssMatStyler() {
    }
    return MdProgressSpinnerCssMatStyler;
}());
export { MdProgressSpinnerCssMatStyler };
MdProgressSpinnerCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-progress-spinner, mat-progress-spinner',
                host: {
                    '[class.mat-progress-spinner]': 'true'
                }
            },] },
];
MdProgressSpinnerCssMatStyler.ctorParameters = function () { return []; };
var MdProgressSpinner = (function () {
    function MdProgressSpinner(_ngZone, _elementRef, _renderer) {
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._lastAnimationId = 0;
        this._mode = 'determinate';
        this._color = 'primary';
    }
    Object.defineProperty(MdProgressSpinner.prototype, "_ariaValueMin", {
        get: function () {
            return this.mode == 'determinate' ? 0 : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "_ariaValueMax", {
        get: function () {
            return this.mode == 'determinate' ? 100 : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "interdeterminateInterval", {
        get: function () {
            return this._interdeterminateInterval;
        },
        set: function (interval) {
            clearInterval(this._interdeterminateInterval);
            this._interdeterminateInterval = interval;
        },
        enumerable: true,
        configurable: true
    });
    MdProgressSpinner.prototype.ngOnDestroy = function () {
        this._cleanupIndeterminateAnimation();
    };
    Object.defineProperty(MdProgressSpinner.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "value", {
        get: function () {
            if (this.mode == 'determinate') {
                return this._value;
            }
        },
        set: function (v) {
            if (v != null && this.mode == 'determinate') {
                var newValue = clamp(v);
                this._animateCircle(this.value || 0, newValue);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressSpinner.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            if (mode !== this._mode) {
                if (mode === 'indeterminate') {
                    this._startIndeterminateAnimation();
                }
                else {
                    this._cleanupIndeterminateAnimation();
                    this._animateCircle(0, this._value);
                }
                this._mode = mode;
            }
        },
        enumerable: true,
        configurable: true
    });
    MdProgressSpinner.prototype._animateCircle = function (animateFrom, animateTo, ease, duration, rotation) {
        var _this = this;
        if (ease === void 0) { ease = linearEase; }
        if (duration === void 0) { duration = DURATION_DETERMINATE; }
        if (rotation === void 0) { rotation = 0; }
        var id = ++this._lastAnimationId;
        var startTime = Date.now();
        var changeInValue = animateTo - animateFrom;
        if (animateTo === animateFrom) {
            this._renderArc(animateTo, rotation);
        }
        else {
            var animation_1 = function () {
                var elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));
                _this._renderArc(ease(elapsedTime, animateFrom, changeInValue, duration), rotation);
                if (id === _this._lastAnimationId && elapsedTime < duration) {
                    requestAnimationFrame(animation_1);
                }
            };
            this._ngZone.runOutsideAngular(animation_1);
        }
    };
    MdProgressSpinner.prototype._startIndeterminateAnimation = function () {
        var _this = this;
        var rotationStartPoint = 0;
        var start = startIndeterminate;
        var end = endIndeterminate;
        var duration = DURATION_INDETERMINATE;
        var animate = function () {
            _this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
            rotationStartPoint = (rotationStartPoint + end) % 100;
            var temp = start;
            start = -end;
            end = -temp;
        };
        if (!this.interdeterminateInterval) {
            this._ngZone.runOutsideAngular(function () {
                _this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
                animate();
            });
        }
    };
    MdProgressSpinner.prototype._cleanupIndeterminateAnimation = function () {
        this.interdeterminateInterval = null;
    };
    MdProgressSpinner.prototype._renderArc = function (currentValue, rotation) {
        if (rotation === void 0) { rotation = 0; }
        var path = this._path = this._path || this._elementRef.nativeElement.querySelector('path');
        if (path) {
            path.setAttribute('d', getSvgArc(currentValue, rotation));
        }
    };
    MdProgressSpinner.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdProgressSpinner.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    return MdProgressSpinner;
}());
export { MdProgressSpinner };
MdProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'md-progress-spinner, mat-progress-spinner',
                host: {
                    'role': 'progressbar',
                    '[attr.aria-valuemin]': '_ariaValueMin',
                    '[attr.aria-valuemax]': '_ariaValueMax'
                },
                template: "<!--\n    preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n    center. The center of the circle will remain at the center of the md-progress-spinner\n    element containing the SVG.\n    -->\n    <svg viewBox=\"0 0 100 100\"\n        preserveAspectRatio=\"xMidYMid meet\">\n      <path></path>\n    </svg>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
MdProgressSpinner.ctorParameters = function () { return [
    { type: NgZone, },
    { type: ElementRef, },
    { type: Renderer, },
]; };
MdProgressSpinner.propDecorators = {
    'color': [{ type: Input },],
    'value': [{ type: Input }, { type: HostBinding, args: ['attr.aria-valuenow',] },],
    'mode': [{ type: HostBinding, args: ['attr.mode',] }, { type: Input },],
};
var MdSpinner = (function (_super) {
    __extends(MdSpinner, _super);
    function MdSpinner(elementRef, ngZone, renderer) {
        var _this = _super.call(this, ngZone, elementRef, renderer) || this;
        _this.mode = 'indeterminate';
        return _this;
    }
    MdSpinner.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return MdSpinner;
}(MdProgressSpinner));
export { MdSpinner };
MdSpinner.decorators = [
    { type: Component, args: [{
                selector: 'md-spinner, mat-spinner',
                host: {
                    'role': 'progressbar',
                    'mode': 'indeterminate',
                    '[class.mat-spinner]': 'true',
                },
                template: "<!--\n    preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n    center. The center of the circle will remain at the center of the md-progress-spinner\n    element containing the SVG.\n    -->\n    <svg viewBox=\"0 0 100 100\"\n        preserveAspectRatio=\"xMidYMid meet\">\n      <path></path>\n    </svg>\n  ",
                styles: ["\n     :host {\n      display: block;\n      height: 100px;\n      width: 100px;\n      overflow: hidden;\n    }\n\n    :host svg {\n      height: 100%;\n      width: 100%;\n      transform-origin: center\n    }\n\n    :host path {\n      fill: transparent;\n      stroke-width: 10px;\n      transition: stroke .3s cubic-bezier(.35, 0, .25, 1)\n    }\n\n    :host[mode=indeterminate] svg {\n      animation-duration: 5.25s, 2.887s;\n      animation-name: mat-progress-spinner-sporadic-rotate, mat-progress-spinner-linear-rotate;\n      animation-timing-function: cubic-bezier(.35, 0, .25, 1), linear;\n      animation-iteration-count: infinite;\n      transition: none\n    }\n\n    @keyframes mat-progress-spinner-linear-rotate {\n      0% {\n        transform: rotate(0)\n      }\n      100% {\n        transform: rotate(360deg)\n      }\n    }\n\n    @keyframes mat-progress-spinner-sporadic-rotate {\n      12.5% {\n        transform: rotate(135deg)\n      }\n      25% {\n        transform: rotate(270deg)\n      }\n      37.5% {\n        transform: rotate(405deg)\n      }\n      50% {\n        transform: rotate(540deg)\n      }\n      62.5% {\n        transform: rotate(675deg)\n      }\n      75% {\n        transform: rotate(810deg)\n      }\n      87.5% {\n        transform: rotate(945deg)\n      }\n      100% {\n        transform: rotate(1080deg)\n      }\n    }\n  "],
            },] },
];
MdSpinner.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer, },
]; };
function clamp(v) {
    return Math.max(0, Math.min(100, v));
}
function polarToCartesian(radius, pathRadius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
    return (radius + (pathRadius * Math.cos(angleInRadians))) +
        ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
}
function linearEase(currentTime, startValue, changeInValue, duration) {
    return changeInValue * currentTime / duration + startValue;
}
function materialEase(currentTime, startValue, changeInValue, duration) {
    var time = currentTime / duration;
    var timeCubed = Math.pow(time, 3);
    var timeQuad = Math.pow(time, 4);
    var timeQuint = Math.pow(time, 5);
    return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
}
function getSvgArc(currentValue, rotation) {
    var startPoint = rotation || 0;
    var radius = 50;
    var pathRadius = 40;
    var startAngle = startPoint * MAX_ANGLE;
    var endAngle = currentValue * MAX_ANGLE;
    var start = polarToCartesian(radius, pathRadius, startAngle);
    var end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    var arcSweep = endAngle < 0 ? 0 : 1;
    var largeArcFlag;
    if (endAngle < 0) {
        largeArcFlag = endAngle >= -180 ? 0 : 1;
    }
    else {
        largeArcFlag = endAngle <= 180 ? 0 : 1;
    }
    return "M" + start + "A" + pathRadius + "," + pathRadius + " 0 " + largeArcFlag + "," + arcSweep + " " + end;
}
//# sourceMappingURL=progress-spinner.js.map