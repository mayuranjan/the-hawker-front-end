import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqueezeBox } from './components/squeezebox';
import { SBItem } from './components/sb-item';
import { SBItemHead } from './components/sb-item-head';
import { SBItemBody } from './components/sb-item-body';
export var SQUEEZEBOX_COMPONENTS = [SqueezeBox, SBItem, SBItemHead, SBItemBody];
var SqueezeBoxModule = (function () {
    function SqueezeBoxModule() {
    }
    return SqueezeBoxModule;
}());
export { SqueezeBoxModule };
SqueezeBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [SQUEEZEBOX_COMPONENTS],
                exports: [SQUEEZEBOX_COMPONENTS]
            },] },
];
SqueezeBoxModule.ctorParameters = function () { return []; };
export * from './components/sb-item';
export * from './components/sb-item-head';
export * from './components/sb-item-body';
export * from './components/squeezebox';
//# sourceMappingURL=index.js.map