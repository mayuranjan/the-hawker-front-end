import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NguiStickyDirective } from "./stickyContentDirective";
export { NguiStickyDirective };
var NguiStickyModule = (function () {
    function NguiStickyModule() {
    }
    return NguiStickyModule;
}());
export { NguiStickyModule };
NguiStickyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [NguiStickyDirective],
                exports: [NguiStickyDirective]
            },] },
];
NguiStickyModule.ctorParameters = function () { return []; };
//# sourceMappingURL=stickyContentModule.js.map