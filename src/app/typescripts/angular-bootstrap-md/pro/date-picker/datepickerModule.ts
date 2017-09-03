import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MyDatePicker } from "./datepickerComponent";
import { FocusDirective } from "./directives/datepickerFocusDirective";
import { InputAutoFillDirective } from "./directives/datepickerAutofillDirective";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [MyDatePicker, FocusDirective, InputAutoFillDirective],
    exports: [MyDatePicker, FocusDirective, InputAutoFillDirective]
})
export class MyDatePickerModule {
}