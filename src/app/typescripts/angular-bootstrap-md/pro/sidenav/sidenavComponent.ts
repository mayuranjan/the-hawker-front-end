import {Component, ViewChild, NgModule,ViewContainerRef,ViewEncapsulation, trigger, state, style, transition, animate, keyframes, Input} from '@angular/core'
import { slideIn } from '../../pro/animations/animations';

@Component ({
    selector: 'sidenav',
    template: `
        <ul id="slide-out" class="side-nav fixed sn-bg-1 custom-scrollbar {{ sidenavClass }}" [@slideIn]="slideInState" >
           <ng-content></ng-content>
        </ul>

        <div (click)="backdrop()" *ngIf="isActive" class="modal-backdrop"></div>

    `,
    animations: [
      slideIn
    ]

})

export class SidenavComponent {

    @Input('sidenavClass') public sidenavClass:any = null;

    slideInState : string = 'inactive';
    isActive: boolean = false;

    collapse() {
        this.slideInState = (this.slideInState === 'inactive' ? 'active' : 'inactive');
        this.isActive = (this.isActive === false ? true : false)
    }

    backdrop(){
        this.slideInState = (this.slideInState === 'inactive' ? 'active' : 'inactive');
        this.isActive = (this.isActive === false ? true : false)
    }

}