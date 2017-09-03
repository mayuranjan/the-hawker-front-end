import { Component, ChangeDetectionStrategy, HostBinding, Input, } from '@angular/core';
var MdProgressBar = (function () {
    function MdProgressBar() {
        this.color = 'primary';
        this._value = 0;
        this._bufferValue = 0;
        this.mode = 'determinate';
    }
    Object.defineProperty(MdProgressBar.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) { this._value = clamp(v || 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressBar.prototype, "bufferValue", {
        get: function () { return this._bufferValue; },
        set: function (v) { this._bufferValue = clamp(v || 0); },
        enumerable: true,
        configurable: true
    });
    MdProgressBar.prototype._primaryTransform = function () {
        var scale = this.value / 100;
        return { transform: "scaleX(" + scale + ")" };
    };
    MdProgressBar.prototype._bufferTransform = function () {
        if (this.mode == 'buffer') {
            var scale = this.bufferValue / 100;
            return { transform: "scaleX(" + scale + ")" };
        }
    };
    return MdProgressBar;
}());
export { MdProgressBar };
MdProgressBar.decorators = [
    { type: Component, args: [{
                selector: 'md-progress-bar, mat-progress-bar',
                host: {
                    'role': 'progressbar',
                    'aria-valuemin': '0',
                    'aria-valuemax': '100',
                    '[class.mat-primary]': 'color == "primary"',
                    '[class.mat-accent]': 'color == "accent"',
                    '[class.mat-warn]': 'color == "warn"',
                    '[class.mat-progress-bar]': 'true',
                },
                template: "<!-- The background div is named as such because it appears below the other divs and is not sized based on values. -->\n    <div class=\"mat-progress-bar-background mat-progress-bar-element\"></div>\n    <div class=\"mat-progress-bar-buffer mat-progress-bar-element\" [ngStyle]=\"_bufferTransform()\"></div>\n    <div class=\"mat-progress-bar-primary mat-progress-bar-fill mat-progress-bar-element\" [ngStyle]=\"_primaryTransform()\"></div>\n    <div class=\"mat-progress-bar-secondary mat-progress-bar-fill mat-progress-bar-element\"></div>\n  ",
                styles: ["\n    :host {\n      display:block;\n      height:5px;\n      overflow:hidden;\n      position:relative;\n      transform:translateZ(0);\n      transition:opacity 250ms linear;\n      width:100%;\n    }\n    :host .mat-progress-bar-element,:host .mat-progress-bar-fill::after {\n      height:100%;\n      position:absolute;\n      width:100%;\n    }\n    :host .mat-progress-bar-background {\n      background-repeat:repeat-x;\n      background-size:10px 4px;\n      display:none;\n    }\n    :host .mat-progress-bar-buffer {\n      transform-origin:top left;\n      transition:transform 250ms ease,stroke .3s cubic-bezier(.35,0,.25,1);\n    }\n    :host .mat-progress-bar-secondary {\n      display:none;\n    } \n    :host .mat-progress-bar-fill {\n      animation:none;\n      transform-origin:top left;\n      transition:transform 250ms ease,stroke .3s cubic-bezier(.35,0,.25,1);\n    }\n    :host .mat-progress-bar-fill::after {\n      animation:none;\n      content:'';\n      display:inline-block;\n      left:0;\n    }\n    :host[mode=query] {\n      transform:rotateZ(180deg);\n    }\n    :host[mode=indeterminate] .mat-progress-bar-fill,:host[mode=query] .mat-progress-bar-fill {\n      transition:none;\n    }\n    :host[mode=indeterminate] .mat-progress-bar-primary,:host[mode=query] .mat-progress-bar-primary {\n      animation:mat-progress-bar-primary-indeterminate-translate 2s infinite linear;\n      left:-145.166611%;\n    }\n    :host[mode=indeterminate] .mat-progress-bar-primary.mat-progress-bar-fill::after,:host[mode=query] .mat-progress-bar-primary.mat-progress-bar-fill::after {\n      animation:mat-progress-bar-primary-indeterminate-scale 2s infinite linear;\n    }\n    :host[mode=indeterminate] .mat-progress-bar-secondary,:host[mode=query] .mat-progress-bar-secondary {\n      animation:mat-progress-bar-secondary-indeterminate-translate 2s infinite linear;\n      left:-54.888891%;\n      display:block;\n    }\n    :host[mode=indeterminate] .mat-progress-bar-secondary.mat-progress-bar-fill::after,:host[mode=query] .mat-progress-bar-secondary.mat-progress-bar-fill::after {\n      animation:mat-progress-bar-secondary-indeterminate-scale 2s infinite linear;\n    }\n    :host[mode=buffer] .mat-progress-bar-background {\n      animation:mat-progress-bar-background-scroll 250ms infinite linear;\n      display:block;\n    }\n    :host-context([dir=rtl]) {\n      transform:rotateY(180deg);\n    }\n    @keyframes mat-progress-bar-primary-indeterminate-translate {\n      0% {\n        transform:translateX(0);\n      }\n      20% {\n        animation-timing-function:cubic-bezier(.5,0,.70173,.49582);\n        transform:translateX(0);\n      }\n      59.15% {\n        animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);\n        transform:translateX(83.67142%);\n      }\n      100% {\n        transform:translateX(200.61106%);\n      }\n    }\n    @keyframes mat-progress-bar-primary-indeterminate-scale {\n      0% {\n        transform:scaleX(.08);\n      }\n      36.65% {\n        animation-timing-function:cubic-bezier(.33473,.12482,.78584,1);\n        transform:scaleX(.08);\n      }\n      69.15% {\n        animation-timing-function:cubic-bezier(.06,.11,.6,1);\n        transform:scaleX(.66148);\n      } \n      100% {\n        transform:scaleX(.08);\n      }\n    }\n    @keyframes mat-progress-bar-secondary-indeterminate-translate {\n      0% {\n        animation-timing-function:cubic-bezier(.15,0,.51506,.40969);\n        transform:translateX(0);\n      }\n      25% {\n        animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);\n        transform:translateX(37.65191%);\n      }\n      48.35% {\n        animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);\n        transform:translateX(84.38617%);\n      }\n      100% {\n        transform:translateX(160.27778%);\n      }\n    }\n    @keyframes mat-progress-bar-secondary-indeterminate-scale {\n      0% {\n        animation-timing-function:cubic-bezier(.15,0,.51506,.40969);\n        transform:scaleX(.08);\n      }\n      19.15% {\n        animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);\n        transform:scaleX(.4571)\n      } \n      44.15% {\n        animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);\n        transform:scaleX(.72796);\n      }\n      100% {\n        transform:scaleX(.08);\n      }\n    }\n    @keyframes mat-progress-bar-background-scroll {\n      to {\n        transform:translateX(-10px)\n      }\n    }  \n    "],
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
MdProgressBar.ctorParameters = function () { return []; };
MdProgressBar.propDecorators = {
    'color': [{ type: Input },],
    'value': [{ type: Input }, { type: HostBinding, args: ['attr.aria-valuenow',] },],
    'bufferValue': [{ type: Input },],
    'mode': [{ type: Input }, { type: HostBinding, args: ['attr.mode',] },],
};
function clamp(v, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.max(min, Math.min(max, v));
}
//# sourceMappingURL=progress-bar.js.map