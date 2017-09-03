import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { DoubleNavbar } from './doubleNavbar';

export const DOUBLE_NAVBAR_COMPONENTS = [DoubleNavbar];

@NgModule({
    imports: [CommonModule],
    declarations: [DOUBLE_NAVBAR_COMPONENTS],
    exports: [DOUBLE_NAVBAR_COMPONENTS]
})
export class DoubleNavbarModule {}

