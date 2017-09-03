import { NgModule, ModuleWithProviders  } from "@angular/core";
import { charCounter } from './charCounter';

@NgModule({
    declarations: [charCounter],
    exports: [charCounter]
})

export class charCounterModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: charCounterModule, providers: []};
  }
}