import { NgModule } from '@angular/core';
import { SimpleChartComponent } from './chartSimpleComponent';
import { EasyPieChartComponent } from './chartSmallpieComponent';
var chartSimpleModule = (function () {
    function chartSimpleModule() {
    }
    return chartSimpleModule;
}());
export { chartSimpleModule };
chartSimpleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SimpleChartComponent, EasyPieChartComponent
                ],
                exports: [
                    SimpleChartComponent, EasyPieChartComponent
                ],
                imports: []
            },] },
];
chartSimpleModule.ctorParameters = function () { return []; };
//# sourceMappingURL=chartSimpleModule.js.map