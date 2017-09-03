import { Component, Renderer, ViewChild } from '@angular/core';
var SBItemBody = (function () {
    function SBItemBody(renderer) {
        this.renderer = renderer;
        this.height = '0';
    }
    SBItemBody.prototype.toggle = function (collapsed) {
        var _this = this;
        var height = '0';
        if (!collapsed) {
            this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', 'auto');
            height = this.bodyEl.nativeElement.offsetHeight + 'px';
            this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', '0');
        }
        setTimeout(function () { return _this.height = height; }, 50);
    };
    return SBItemBody;
}());
export { SBItemBody };
SBItemBody.decorators = [
    { type: Component, args: [{
                exportAs: 'sbItemBody',
                selector: 'sb-item-body',
                template: "\n        <div #body class=\"sb-item-body\" [style.height]=\"height\">\n            <div class=\"card-block\"><ng-content></ng-content></div>\n        </div>\n    "
            },] },
];
SBItemBody.ctorParameters = function () { return [
    { type: Renderer, },
]; };
SBItemBody.propDecorators = {
    'bodyEl': [{ type: ViewChild, args: ['body',] },],
};
//# sourceMappingURL=sb-item-body.js.map