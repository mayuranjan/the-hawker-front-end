import {Component, Input,Output,ElementRef,EventEmitter,OnInit,HostListener,trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { zoomState, restartState } from '../../pro/animations/animations';

declare var screenfull: any;

import 'hammerjs';

@Component({
  selector: 'ImageModal',
  animations: [zoomState, restartState] ,
  template: `
    <div class="ng-gallery mdb-lightbox {{ type }}" *ngIf="showRepeat"> 
      <figure class="col-md-4" *ngFor ="let i of modalImages; let index = index">
        <img src="{{ !i.thumb ? i.img : i.thumb }}" class="ng-thumb" (click)="openGallery(index)" alt="Image {{ index + 1 }}" />
      </figure>
    </div>
    <div  tabindex="0" class="ng-overlay" [class.hide_lightbox]="opened == false">
      <div class="top-bar">
        <span class="info-text">{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span>      
        <a class="close-popup" (click)="closeGallery()" (click)="toggleRestart()">
        </a>
        <a *ngIf="!is_iPhone_or_iPod" class="fullscreen-toogle" [class.toggled]='fullscreen' (click)="fullScreen()">
        </a>
        <a class="zoom-toogle" [class.zoom]='zoom' (click)="toggleZoomed()" *ngIf="!isMobile">
        </a>
      </div>
      <div class="ng-gallery-content">
        <!--<img *ngIf="!loading" src="{{imgSrc}}" (mousedown)="checkEvent($event)" (mouseup)="setZoom($event)" [class.zoom]='zoom' [class.smooth]='smooth' class="effect" (swipeleft)="swipe($event, $event.type)" (swiperight)="swipe($event, $event.type)"/>-->
        <img *ngIf="!loading" src="{{imgSrc}}" [class.smooth]='smooth' class="effect" (swipeleft)="swipe($event, $event.type)" (swiperight)="swipe($event, $event.type)" (click)="toggleZoomed()" [@zoomState]="zoomed" [@restartState]="restart"/>

        <div class="uil-ring-css" *ngIf="loading">
          <div></div>
        </div>  
        <a class="nav-left" *ngIf="modalImages.length >1 && !isMobile" (click)="prevImage()" >
          <span></span>
        </a>
        <a class="nav-right" *ngIf="modalImages.length >1 && !isMobile" (click)="nextImage()">
          <span></span>
        </a>
        
      </div>
    </div>

    <div *ngIf="openModalWindow">
      <ImageModal [modalImages]="images" [imagePointer]="imagePointer" (cancelEvent)="cancelImageModel()"></ImageModal>
    </div>
  `,
  host: {
    '(document:keyup)': 'keyboardControl($event)'
  },
})

export class ImageModal implements OnInit {
   public _element:any;
   public opened:boolean = false;
   public imgSrc:string;
   public currentImageIndex:number;
   public loading:boolean= false;
   public showRepeat:boolean= false;
   public isMobile:boolean = false;

   public openModalWindow: any;

  @Input('modalImages') public modalImages:any;
  @Input('imagePointer') public imagePointer:number;

  @Input('fullscreen') public fullscreen: boolean;
  @Input('zoom') public zoom: boolean;
  @Input('smooth') public smooth: boolean = true;
  @Input('type') public type: String;

  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
    try {
      document.createEvent("TouchEvent");
      this.isMobile = true;
    } catch(err) {
      this.isMobile = false;
      return;
    }
  }

  zoomed: string = 'inactive';
  
  toggleZoomed() {
    this.zoomed = (this.zoomed == 'inactive') ? 'active' : 'inactive';
    this.zoom = !this.zoom;
  }


  toggleRestart() {
    this.zoomed = (this.zoomed == 'inactive') ? 'active' : 'inactive';
  }


  ngOnInit() {
      this.loading = true;
      if(this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.smooth = false;
    this.zoom = false;
    if(screenfull.enabled) {
       screenfull.exit();
    }
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    // this.smooth = false;
    // this.zoom = false;
    this.loading = true;
    this.currentImageIndex--;
    if(this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length-1  ;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    // this.smooth = false;
    // this.zoom = false;
    this.loading = true;
    this.currentImageIndex++;
    if(this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index: any) {
    if(!index) {
    this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
      this.opened = true;
     for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex ) {
              this.imgSrc = this.modalImages[i].img;
              this.loading = false;
              break;
            }
       }  
  }

  fullScreen(): any {
    if (screenfull.enabled) {
			screenfull.toggle();
		}
  }

  get is_iPhone_or_iPod(){
    if (navigator && navigator.userAgent && navigator.userAgent != null) {
        var strUserAgent = navigator.userAgent.toLowerCase();
        var arrMatches = strUserAgent.match(/ipad/);
        if (arrMatches != null) 
             return true;
    }

    return false;
  }

  keyboardControl(event: KeyboardEvent) {
    if(event.keyCode == 39) {
      this.nextImage();
    }
    if(event.keyCode == 37) {
      this.prevImage();
    }
  }

  // protected mouseX;
  // protected mouseY; 

  // checkEvent(event) {
  //   this.mouseX = event.clientX;
  //   this.mouseY = event.clientY;
  // }
 
  // setZoom(event) {
  //   if(event.type === 'click') {
  //     if(this.zoom) {
  //       this.smooth = true;
  //       this.zoom = false;
  //     } else {
  //       this.smooth = true;
  //       this.zoom = true;
  
  //     }
  //   }

  //   if(this.mouseX == event.clientX && this.mouseY == event.clientY) {
  //     if(this.zoom) {
  //       this.smooth = true;
  //       this.zoom = false;
  //     } else {
  //       this.smooth = true;
  //       this.zoom = true;
  
  //     }
  //   }
  // }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight'};

   swipe(event: any, action: String = this.SWIPE_ACTION.RIGHT) {
        // let thisImg = this._element.querySelector('.ng-gallery-content').querySelector('img[src="' + this.imgSrc + '"]');

        if (action == this.SWIPE_ACTION.RIGHT) {
            this.nextImage();
            // console.log(event.distance, this.modalImages);
        }

        // previous
        if (action === this.SWIPE_ACTION.LEFT) {
           this.prevImage();
        }

    }

}