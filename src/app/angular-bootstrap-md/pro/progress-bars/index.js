import { NgModule } from '@angular/core';
export { BarComponent } from './barComponent';
export { ProgressDirective } from './progressDirective';
export { ProgressbarComponent } from './progressbarComponent';
export { ProgressbarModule } from './progressbarModule';
export { ProgressbarConfig } from './progressbarConfig';
export { ProgressSpinnerComponent } from './progressSpinnerComponent';
import { ProgressbarModule } from './progressbarModule';
import { MdProgressSpinnerModule } from './progress-spinner/';
import { MdProgressBarModule } from './progress-bars/';
var MATERIAL_MODULES = [
    MdProgressBarModule,
    MdProgressSpinnerModule,
    ProgressbarModule
];
var MaterialRootModule = (function () {
    function MaterialRootModule() {
    }
    return MaterialRootModule;
}());
export { MaterialRootModule };
MaterialRootModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MdProgressBarModule.forRoot(),
                    MdProgressSpinnerModule.forRoot(),
                    ProgressbarModule.forRoot()
                ],
                exports: MATERIAL_MODULES,
            },] },
];
MaterialRootModule.ctorParameters = function () { return []; };
var ProgressBars = (function () {
    function ProgressBars() {
    }
    ProgressBars.forRoot = function () {
        return { ngModule: MaterialRootModule };
    };
    return ProgressBars;
}());
export { ProgressBars };
ProgressBars.decorators = [
    { type: NgModule, args: [{
                imports: MATERIAL_MODULES,
                exports: MATERIAL_MODULES,
            },] },
];
ProgressBars.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map