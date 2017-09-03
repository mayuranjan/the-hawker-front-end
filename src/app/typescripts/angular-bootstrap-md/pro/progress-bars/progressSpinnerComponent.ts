import { Component, Input, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'progress-spinner',
  template: `
    <div class="preloader-wrapper {{spinnerType}}">
        <md-progress-spinner mode="indeterminate"></md-progress-spinner>
    </div>
  `,
  styles: []
})
export class ProgressSpinnerComponent{
  	el: ElementRef;
    addClass: String = 'spinner-blue-only';
    @Input() spinnerType: string = '';
    @Input() spinnerColor: string = 'rainbow';

     constructor(el: ElementRef) {
    	this.el = el;
    }

    ngAfterViewInit() {
        const hostElem = this.el.nativeElement;
        let colorClass = this.spinnerColor;
        this.addClass = 'spinner-rainbow';

        switch(colorClass) {
            case 'green':
                this.addClass = "spinner-green-only";
                break;
            case 'blue':
                this.addClass = "spinner-blue-only";
                break;
            case 'yellow':
                this.addClass = "spinner-yellow-only";
                break;
            case 'red':
                this.addClass = "spinner-red-only";
                break;
            case 'rainbow':
                this.addClass = "spinner-rainbow spinner-blue-only mat-progress-spinner";
                this.spinerRun();
                break;
        }
        hostElem.children[0].children[0].className += " " + this.addClass; 
    }

    spinerRun() {
        let counter = 0;
        const hostElem = this.el.nativeElement;
        setInterval(() => {
            switch(counter) {
                case 0:
                    this.addClass = 'spinner-red-only mat-progress-spinner ';
                    break;
                case 1: 
                    this.addClass = 'spinner-yellow-only mat-progress-spinner';
                    break;
                case 2:
                    this.addClass = 'spinner-blue-only mat-progress-spinner';
                    break;
                case 3:
                    this.addClass = 'spinner-green-only mat-progress-spinner';
                    break;
            }

            hostElem.children[0].children[0].className = " " + this.addClass;
            if(counter < 3) {
                counter++;
            } else {
                counter = 0;
            }
        },1333);


  }

}
