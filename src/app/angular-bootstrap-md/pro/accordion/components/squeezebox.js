import { Component, Input, ContentChildren, forwardRef } from '@angular/core';
import { SBItem } from './sb-item';
var SqueezeBox = (function () {
    function SqueezeBox() {
        this.multiple = true;
    }
    SqueezeBox.prototype.didItemToggled = function (item) {
        if (!this.multiple) {
            this.items.toArray().forEach(function (i) {
                if (i !== item) {
                    i.applyToggle(true);
                }
            });
        }
    };
    return SqueezeBox;
}());
export { SqueezeBox };
SqueezeBox.decorators = [
    { type: Component, args: [{
                exportAs: 'squeezebox',
                selector: 'squeezebox',
                template: "\n        <div class=\"accordion\">\n            <ng-content></ng-content>\n        </div>\n    "
            },] },
];
SqueezeBox.ctorParameters = function () { return []; };
SqueezeBox.propDecorators = {
    'multiple': [{ type: Input },],
    'items': [{ type: ContentChildren, args: [forwardRef(function () { return SBItem; }),] },],
};
//# sourceMappingURL=squeezebox.js.map