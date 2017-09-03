import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleNavbar } from './doubleNavbar';
export var DOUBLE_NAVBAR_COMPONENTS = [DoubleNavbar];
var DoubleNavbarModule = (function () {
    function DoubleNavbarModule() {
    }
    return DoubleNavbarModule;
}());
export { DoubleNavbarModule };
DoubleNavbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [DOUBLE_NAVBAR_COMPONENTS],
                exports: [DOUBLE_NAVBAR_COMPONENTS]
            },] },
];
DoubleNavbarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map