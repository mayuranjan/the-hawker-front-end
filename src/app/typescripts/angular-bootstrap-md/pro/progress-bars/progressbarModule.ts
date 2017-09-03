import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { BarComponent } from './barComponent';
import { ProgressDirective } from './progressDirective';
import { ProgressbarComponent } from './progressbarComponent';
import { ProgressbarConfig } from './progressbarConfig';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
  exports: [ProgressDirective, BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: ProgressbarModule, providers: [ProgressbarConfig]};
  }
}