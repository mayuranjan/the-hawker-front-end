import { Directive, Input, ViewContainerRef } from '@angular/core';
var NgTranscludeDirective = (function () {
    function NgTranscludeDirective(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(NgTranscludeDirective.prototype, "ngTransclude", {
        get: function () {
            return this._ngTransclude;
        },
        set: function (templateRef) {
            this._ngTransclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    return NgTranscludeDirective;
}());
export { NgTranscludeDirective };
NgTranscludeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngTransclude]'
            },] },
];
NgTranscludeDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
NgTranscludeDirective.propDecorators = {
    'ngTransclude': [{ type: Input },],
};
//# sourceMappingURL=transcludeDirective.js.map