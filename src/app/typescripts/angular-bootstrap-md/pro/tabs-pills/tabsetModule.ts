import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgTranscludeDirective } from './transcludeDirective';
import { TabHeadingDirective } from './tabHeadingDirective';
import { TabDirective } from './tabDirective';
import { TabsetComponent } from './tabsetComponent';
import { TabsetConfig } from './tabsetConfig';
import { RippleDirective } from './ripple-effect.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective, RippleDirective],
  exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective, RippleDirective]
})
export class TabsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule,
      providers: [TabsetConfig]
    };
  }
}