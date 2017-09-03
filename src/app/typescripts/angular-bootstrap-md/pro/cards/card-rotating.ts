import { Component } from '@angular/core';


@Component({
    selector: 'card-rotating',
    template: `

    <div class="flip-container card-wrapper" [ngClass]="{'rotate': rotate}">
		<div class="flipper card-rotating effect__click tp-box">
            <ng-content></ng-content>
        </div>
    </div>
    `
})

export class CardRotating {
    public rotate: boolean = false;
  
   
  
    toggle() {
        this.rotate = !this.rotate;
    }
}