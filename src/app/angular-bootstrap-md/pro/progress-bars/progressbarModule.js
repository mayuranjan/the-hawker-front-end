import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarComponent } from './barComponent';
import { ProgressDirective } from './progressDirective';
import { ProgressbarComponent } from './progressbarComponent';
import { ProgressbarConfig } from './progressbarConfig';
var ProgressbarModule = (function () {
    function ProgressbarModule() {
    }
    ProgressbarModule.forRoot = function () {
        return { ngModule: ProgressbarModule, providers: [ProgressbarConfig] };
    };
    return ProgressbarModule;
}());
export { ProgressbarModule };
ProgressbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
                exports: [ProgressDirective, BarComponent, ProgressbarComponent]
            },] },
];
ProgressbarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=progressbarModule.js.map