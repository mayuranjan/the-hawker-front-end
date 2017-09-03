import { NgModule } from '@angular/core';
import { CompatibilityModule } from '../core/compatibility/compatibility';
import { MdProgressSpinner, MdSpinner, MdProgressSpinnerCssMatStyler, } from './progress-spinner';
import { ProgressSpinnerComponent } from '../progressSpinnerComponent';
var MdProgressSpinnerModule = (function () {
    function MdProgressSpinnerModule() {
    }
    MdProgressSpinnerModule.forRoot = function () {
        return {
            ngModule: MdProgressSpinnerModule,
            providers: []
        };
    };
    return MdProgressSpinnerModule;
}());
MdProgressSpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [
                    MdProgressSpinner,
                    MdSpinner,
                    CompatibilityModule,
                    MdProgressSpinnerCssMatStyler,
                    ProgressSpinnerComponent
                ],
                declarations: [
                    MdProgressSpinner,
                    MdSpinner,
                    MdProgressSpinnerCssMatStyler,
                    ProgressSpinnerComponent
                ],
            },] },
];
MdProgressSpinnerModule.ctorParameters = function () { return []; };
export { MdProgressSpinnerModule };
export * from './progress-spinner';
//# sourceMappingURL=index.js.map