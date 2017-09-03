import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule  } from '@angular/common';

import { CardReveal } from './card-reveal';
import { CardRotating } from './card-rotating';

@NgModule({
  imports: [CommonModule],
  declarations: [ CardReveal, CardRotating],
  exports: [CardReveal, CardRotating]
})
export class CardsModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: CardsModule, providers: []};
  }
}