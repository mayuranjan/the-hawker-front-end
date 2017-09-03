import { NgModule } from "@angular/core";
import { charCounter } from './charCounter';
var charCounterModule = (function () {
    function charCounterModule() {
    }
    charCounterModule.forRoot = function () {
        return { ngModule: charCounterModule, providers: [] };
    };
    return charCounterModule;
}());
export { charCounterModule };
charCounterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [charCounter],
                exports: [charCounter]
            },] },
];
charCounterModule.ctorParameters = function () { return []; };
//# sourceMappingURL=charCounterModule.js.map