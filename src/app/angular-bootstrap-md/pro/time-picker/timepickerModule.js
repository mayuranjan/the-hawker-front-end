import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ClockPicker } from './timepickerComponent';
var timepickerModule = (function () {
    function timepickerModule() {
    }
    return timepickerModule;
}());
export { timepickerModule };
timepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [ClockPicker],
                exports: [ClockPicker]
            },] },
];
timepickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=timepickerModule.js.map