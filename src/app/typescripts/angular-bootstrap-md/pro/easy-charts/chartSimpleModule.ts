import { NgModule } from '@angular/core';

import { SimpleChartComponent } from './chartSimpleComponent';
import { EasyPieChartComponent } from './chartSmallpieComponent';

@NgModule({
  declarations: [
    SimpleChartComponent, EasyPieChartComponent
  ],
  exports: [
   SimpleChartComponent, EasyPieChartComponent
  ],
  imports: []
})
export class chartSimpleModule {
}