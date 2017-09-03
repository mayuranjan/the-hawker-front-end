import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SelectComponent} from './selectComponent';
import {SelectDropdownComponent} from './selectDropdownComponent';

export * from './optionInterface';
export * from './selectComponent';

@NgModule({
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
})
export class SelectModule {}