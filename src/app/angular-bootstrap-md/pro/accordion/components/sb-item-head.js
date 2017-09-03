import { Component } from '@angular/core';
import { SBItem } from './sb-item';
var SBItemHead = (function () {
    function SBItemHead(sbItem) {
        this.sbItem = sbItem;
    }
    SBItemHead.prototype.toggleClick = function (event) {
        event.preventDefault();
        this.sbItem.collapsed = !this.sbItem.collapsed;
        this.sbItem.toggle(this.sbItem.collapsed);
    };
    return SBItemHead;
}());
export { SBItemHead };
SBItemHead.decorators = [
    { type: Component, args: [{
                exportAs: 'sbItemHead',
                selector: 'sb-item-head',
                template: "\n        <div class=\"card-header\">\n            <a role=\"button\" (click)=\"toggleClick($event)\">\n                <h5 class=\"mb-0\">\n                    <ng-content></ng-content>\n                    <i class=\"fa fa-angle-down rotate-icon\"></i>\n                </h5>\n            </a>\n        </div>\n    "
            },] },
];
SBItemHead.ctorParameters = function () { return [
    { type: SBItem, },
]; };
//# sourceMappingURL=sb-item-head.js.map