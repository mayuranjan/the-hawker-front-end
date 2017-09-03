import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './selectComponent';
import { SelectDropdownComponent } from './selectDropdownComponent';
export * from './selectComponent';
var SelectModule = (function () {
    function SelectModule() {
    }
    return SelectModule;
}());
export { SelectModule };
SelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SelectComponent,
                    SelectDropdownComponent
                ],
                exports: [
                    SelectComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ]
            },] },
];
SelectModule.ctorParameters = function () { return []; };
//# sourceMappingURL=selectModule.js.map