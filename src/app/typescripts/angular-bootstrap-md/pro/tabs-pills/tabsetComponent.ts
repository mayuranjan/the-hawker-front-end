import { Component, Output, EventEmitter, ViewChildren, HostBinding, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';

import { TabDirective } from './tabDirective';
import { TabsetConfig } from './tabsetConfig';

import { RippleDirective } from './ripple-effect.component';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  template: `
  <div class="row">
    <div class="{{ listGetClass }}">
      <ul class="nav {{ buttonClass }}" [ngClass]="classMap" (click)="$event.preventDefault()">
          <li *ngFor="let tabz of tabs;let i = index" [ngClass]="['nav-item', tabz.customClass || '']"
            [class.active]="tabz.active" [class.disabled]="tabz.disabled">
            <a #tabEl href="javascript:void(0);" class="nav-link waves-light"
              [class.active]="tabz.active" [class.disabled]="tabz.disabled"
              (click)="click($event, i)">
              <span [ngTransclude]="tabz.headingRef" [innerHTML]="tabz.heading"></span>
              <span *ngIf="tabz.removable">
                <span (click)="$event.preventDefault(); removeTab(tabz);" class="glyphicon glyphicon-remove-circle"></span>
              </span>
            </a>
          </li>
      </ul>
    </div>
    <div class="{{ tabsGetClass }}">
      <div class="tab-content {{ contentClass }}">
        <ng-content></ng-content>
      </div>
    </div>
  </div>`,
  providers: [RippleDirective]
})

export class TabsetComponent implements OnDestroy, OnInit {
  @Input('buttonStyle') buttonClass:String;
  @Input('contentStyle') contentClass:String;
  /** if true tabs will be placed vertically */

  @ViewChildren('tabEl', {read: ElementRef}) tabEl: any;

  @Output()
  showBsTab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  shownBsTab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  hideBsTab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  hiddenBsTab: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public get vertical():boolean {
    return this._vertical;
  }
  public set vertical(value:boolean) {
    this._vertical = value;
    this.setClassMap();
  }
   public setActiveTab(index: number): void {
    this.tabs[index - 1].active = true
  }
  /** if true tabs fill the container and have a consistent width */
  @Input()
  public get justified():boolean {
    return this._justified;
  }
  public set justified(value:boolean) {
    this._justified = value;
    this.setClassMap();
  }

  /** navigation context class: 'tabs' or 'pills' */
  @Input()
  public get type():string {
    return this._type;
  }
  public set type(value:string) {
    this._type = value;
    this.setClassMap();
  }

  @HostBinding('class.tab-container') public clazz:boolean = true;

  public tabs:TabDirective[] = [];
  public classMap:any = {};

  protected isDestroyed:boolean;
  protected _vertical:boolean;
  protected _justified:boolean;
  protected _type:string;

  public constructor(config: TabsetConfig, public ripple: RippleDirective) {
    Object.assign(this, config);
  }

  public click(event: any, index: any) {
    let prev = this.tabEl.toArray()[this.getActive()];
    let clicked = this.tabEl.toArray()[index];
    
    this.hideBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });
    this.showBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });

    this.setActiveTab(index + 1);
    this.ripple.el = clicked;
    this.ripple.click(event);

     this.hiddenBsTab.emit({
      target: clicked,
      relatedTarget: prev
    }); 
    this.shownBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });
  }

  public ngOnDestroy():void {
    this.isDestroyed = true;
  }

  public getActive() {
    let tabs = this.tabs.map((object, index) => {
      return {
        index: index,
        object: object
      };
    });
   
    for(let tab of tabs) {
      if(tab.object.active){
        return tab.index;
      }
    }
  }

  public addTab(tab:TabDirective):void {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  public removeTab(tab:TabDirective):void {
    let index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && this.hasAvailableTabs(index)) {
      let newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }

    tab.removed.emit(tab);
    this.tabs.splice(index, 1);
  }

  protected getClosestTabIndex(index:number):number {
    let tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      let prevIndex = index - step;
      let nextIndex = index + step;
      if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }
    return -1;
  }

  protected hasAvailableTabs(index:number):boolean {
    let tabsLength = this.tabs.length;
    if (!tabsLength) {
      return false;
    }

    for (let i = 0; i < tabsLength; i += 1) {
      if (!this.tabs[i].disabled && i !== index) {
        return true;
      }
    }
    return false;
  }

  protected setClassMap():void {
    this.classMap = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified,
      //[`nav-${this.type}`]: true
    };
  }
  public listGetClass: String;
  public tabsGetClass: String;

  public listGet() {
    if(this.vertical) {
      this.listGetClass = "col-md-3";
    } else {
      this.listGetClass = "col-md-12";
    }
  }

  public tabsGet() {
    if(this.vertical) {
      this.tabsGetClass = "col-md-9";
    } else {
      this.tabsGetClass = "col-md-12";
    }
  }
  ngOnInit() {
    this.listGet();
    this.tabsGet();
  }
}