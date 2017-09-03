import {NgModule, ModuleWithProviders} from '@angular/core';

export { BarComponent } from './barComponent';
export { ProgressDirective } from './progressDirective';
export { ProgressbarComponent } from './progressbarComponent';
export { ProgressbarModule } from './progressbarModule';
export { ProgressbarConfig } from './progressbarConfig';
export { ProgressSpinnerComponent } from './progressSpinnerComponent';
import { ProgressbarModule } from './progressbarModule';

import {MdProgressSpinnerModule} from './progress-spinner/';
import {MdProgressBarModule} from './progress-bars/';


const MATERIAL_MODULES = [
  MdProgressBarModule,
  MdProgressSpinnerModule,
  ProgressbarModule
];

@NgModule({
    imports: [
    MdProgressBarModule.forRoot(),
    MdProgressSpinnerModule.forRoot(),
    ProgressbarModule.forRoot()
    ],
    exports: MATERIAL_MODULES,
})

export class MaterialRootModule { }

/** @deprecated */
@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class ProgressBars {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {ngModule: MaterialRootModule};
  }
}