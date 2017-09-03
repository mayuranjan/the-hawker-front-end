import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompatibilityModule } from '../core/compatibility/compatibility';
import { MdProgressBar } from './progress-bar';
var MdProgressBarModule = (function () {
    function MdProgressBarModule() {
    }
    MdProgressBarModule.forRoot = function () {
        return {
            ngModule: MdProgressBarModule,
            providers: []
        };
    };
    return MdProgressBarModule;
}());
export { MdProgressBarModule };
MdProgressBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CompatibilityModule],
                exports: [MdProgressBar, CompatibilityModule],
                declarations: [MdProgressBar],
            },] },
];
MdProgressBarModule.ctorParameters = function () { return []; };
export * from './progress-bar';
//# sourceMappingURL=index.js.map