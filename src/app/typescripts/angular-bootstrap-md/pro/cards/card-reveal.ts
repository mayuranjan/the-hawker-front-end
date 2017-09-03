import { Component } from '@angular/core';
import {socialsState} from '../animations/animations';

@Component({
    selector: 'card-reveal',
    template: `

    <div class="card-overflow col-12">
        <div class="card-front">
            <ng-content select="card-front" ></ng-content>
        </div>
        <div class="card-revealed" *ngIf="show" [@socialsState]="socials">
            <ng-content select="card-revealed" ></ng-content>
        </div>
    </div>
    `,
    animations: [socialsState]
})

export class CardReveal {
    public socials: any;
    public show: boolean;

    toggle() {
        this.show = !this.show;
        this.socials = (this.socials === 'active') ? 'inactive' : 'active';
    }
}