import { Component, ContentChild, Input, Inject, forwardRef } from '@angular/core';
import { SBItemBody } from './sb-item-body';
import { SqueezeBox } from './squeezebox';
var SBItem = (function () {
    function SBItem(squeezebox) {
        this.collapsed = true;
        this.squeezebox = squeezebox;
    }
    SBItem.prototype.ngAfterViewInit = function () {
        this.body.toggle(this.collapsed);
    };
    SBItem.prototype.toggle = function (collapsed) {
        this.squeezebox.didItemToggled(this);
        this.applyToggle(collapsed);
    };
    SBItem.prototype.applyToggle = function (collapsed) {
        this.collapsed = collapsed;
        this.body.toggle(collapsed);
    };
    return SBItem;
}());
export { SBItem };
SBItem.decorators = [
    { type: Component, args: [{
                exportAs: 'sbItem',
                selector: 'sb-item',
                template: "\n        <div class=\"card\" [ngClass]=\"{'is-collapsed': collapsed, 'active': !collapsed}\">\n            <ng-content></ng-content>\n        </div>\n    "
            },] },
];
SBItem.ctorParameters = function () { return [
    { type: SqueezeBox, decorators: [{ type: Inject, args: [forwardRef(function () { return SqueezeBox; }),] },] },
]; };
SBItem.propDecorators = {
    'collapsed': [{ type: Input },],
    'body': [{ type: ContentChild, args: [SBItemBody,] },],
};
//# sourceMappingURL=sb-item.js.map