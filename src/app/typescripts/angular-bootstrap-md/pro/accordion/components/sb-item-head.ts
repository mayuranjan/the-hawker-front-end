import {Component} from '@angular/core';
import {SBItem} from './sb-item';

@Component({
    exportAs: 'sbItemHead',
    selector: 'sb-item-head',
    template: `
        <div class="card-header">
            <a role="button" (click)="toggleClick($event)">
                <h5 class="mb-0">
                    <ng-content></ng-content>
                    <i class="fa fa-angle-down rotate-icon"></i>
                </h5>
            </a>
        </div>
    `
})
export class SBItemHead {

    constructor(private sbItem: SBItem) {}
    
    toggleClick(event: any) {
        event.preventDefault();
        this.sbItem.collapsed = !this.sbItem.collapsed;
        this.sbItem.toggle(this.sbItem.collapsed);
    }
}