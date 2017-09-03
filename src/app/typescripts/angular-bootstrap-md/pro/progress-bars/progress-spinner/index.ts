import {NgModule, ModuleWithProviders} from '@angular/core';
import {CompatibilityModule} from '../core/compatibility/compatibility';
import {
  MdProgressSpinner,
  MdSpinner,
  MdProgressSpinnerCssMatStyler,
} from './progress-spinner';

import { ProgressSpinnerComponent } from '../progressSpinnerComponent';


@NgModule({
  imports: [CompatibilityModule],
  exports: [
    MdProgressSpinner,
    MdSpinner,
    CompatibilityModule,
    MdProgressSpinnerCssMatStyler,
    ProgressSpinnerComponent
  ],
  declarations: [
    MdProgressSpinner,
    MdSpinner,
    MdProgressSpinnerCssMatStyler,
    ProgressSpinnerComponent
  ],
})
class MdProgressSpinnerModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdProgressSpinnerModule,
      providers: []
    };
  }
}

export {MdProgressSpinnerModule};
export * from './progress-spinner';