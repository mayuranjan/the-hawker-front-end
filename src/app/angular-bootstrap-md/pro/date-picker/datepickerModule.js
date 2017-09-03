import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MyDatePicker } from "./datepickerComponent";
import { FocusDirective } from "./directives/datepickerFocusDirective";
import { InputAutoFillDirective } from "./directives/datepickerAutofillDirective";
var MyDatePickerModule = (function () {
    function MyDatePickerModule() {
    }
    return MyDatePickerModule;
}());
export { MyDatePickerModule };
MyDatePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [MyDatePicker, FocusDirective, InputAutoFillDirective],
                exports: [MyDatePicker, FocusDirective, InputAutoFillDirective]
            },] },
];
MyDatePickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datepickerModule.js.map