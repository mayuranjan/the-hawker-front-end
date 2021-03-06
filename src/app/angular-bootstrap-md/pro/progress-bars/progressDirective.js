import { Directive, HostBinding, Input } from '@angular/core';
var ProgressDirective = (function () {
    function ProgressDirective() {
        this.addClass = true;
        this.bars = [];
        this._max = 100;
    }
    Object.defineProperty(ProgressDirective.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = v;
            this.bars.forEach(function (bar) {
                bar.recalculatePercentage();
            });
        },
        enumerable: true,
        configurable: true
    });
    ProgressDirective.prototype.addBar = function (bar) {
        if (!this.animate) {
            bar.transition = 'none';
        }
        this.bars.push(bar);
    };
    ProgressDirective.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    return ProgressDirective;
}());
export { ProgressDirective };
ProgressDirective.decorators = [
    { type: Directive, args: [{ selector: 'bs-progress, [progress]' },] },
];
ProgressDirective.ctorParameters = function () { return []; };
ProgressDirective.propDecorators = {
    'animate': [{ type: Input },],
    'max': [{ type: HostBinding, args: ['attr.max',] }, { type: Input },],
    'addClass': [{ type: HostBinding, args: ['class.progress',] },],
};
//# sourceMappingURL=progressDirective.js.map