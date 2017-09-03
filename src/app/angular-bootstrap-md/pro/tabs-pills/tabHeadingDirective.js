import { Directive, TemplateRef } from '@angular/core';
import { TabDirective } from './tabDirective';
var TabHeadingDirective = (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    return TabHeadingDirective;
}());
export { TabHeadingDirective };
TabHeadingDirective.decorators = [
    { type: Directive, args: [{ selector: '[tabHeading]' },] },
];
TabHeadingDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: TabDirective, },
]; };
//# sourceMappingURL=tabHeadingDirective.js.map