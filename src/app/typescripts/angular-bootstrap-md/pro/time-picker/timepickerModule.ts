import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { ClockPicker } from './timepickerComponent';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ClockPicker],
    exports: [ClockPicker]
})
export class timepickerModule {
}