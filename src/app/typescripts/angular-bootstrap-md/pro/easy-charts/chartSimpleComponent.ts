import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'simple-chart',
  template: `
    <span class="min-chart">
      <span class="percent">{{ percent }}</span>
      <easy-pie-chart [percent]="percent" [options]="options"></easy-pie-chart>
    </span>
  `,
  styles: []
})
export class SimpleChartComponent implements OnInit {
  @Input('percent') percent: any;
  @Input('barColor') barColor: string;
  public options: any = {
    barColor: null,
    trackColor: '#f9f9f9',
    scaleColor: '#dfe0e0',
    scaleLength: 5,
    lineCap: 'round',
    lineWidth: 3,
    size: 110,
    rotate: 0,
    animate: {
        duration: 1000,
        enabled: true
    }
  };

  
  constructor() {
  }

  ngOnInit(){
    this.options.barColor = "#"+this.barColor;
  }
  
}
