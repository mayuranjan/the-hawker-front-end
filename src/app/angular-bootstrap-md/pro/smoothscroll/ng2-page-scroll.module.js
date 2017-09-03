import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageScrollService } from './ng2-page-scroll.service';
import { PageScroll } from './ng2-page-scroll.directive';
var Ng2PageScrollModule = (function () {
    function Ng2PageScrollModule() {
    }
    Ng2PageScrollModule.forRoot = function () {
        return {
            ngModule: Ng2PageScrollModule,
            providers: [
                { provide: PageScrollService, useClass: PageScrollService }
            ]
        };
    };
    return Ng2PageScrollModule;
}());
export { Ng2PageScrollModule };
Ng2PageScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [PageScroll],
                exports: [PageScroll]
            },] },
];
Ng2PageScrollModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ng2-page-scroll.module.js.map