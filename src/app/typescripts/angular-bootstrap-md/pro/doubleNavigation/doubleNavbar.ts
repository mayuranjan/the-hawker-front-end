import { Component, ElementRef, Renderer, AfterViewInit, Input, ViewChild } from '@angular/core';


@Component({
    selector: 'DoubleNavbar',
    template: `
    <header>
        <ul #sidenav class="side-nav fixed sn-bg-1">
            <ng-content select="SideNav"></ng-content>
            <div class="sidenav-bg mask-strong"></div>
        </ul>
        <nav #navbar class="navbar double-nav {{ navbarClass }}">
            <div class="float-left">
                <a (click)="showSideNav(); shown = true;" data-activates="slide-out" class="button-collapse"><i class="fa fa-bars"></i></a>
            </div>
            <div class="breadcrumb-dn mr-auto">
                <ng-content select="breadcrumb"></ng-content>
            </div>
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
                <ng-content select="links"></ng-content>
            </ul>
        </nav>
        <div #overlay id="sidenav-overlay" style="opacity: 0; display: none;" (click)="hiddeSideNav(); shown = false"></div>
    </header>
    `,
    host: {
        '(window:resize)': 'windwosResize()',
        '(window:scroll)': 'scrolling($event)'
    } 
})

export class DoubleNavbar implements AfterViewInit {

    public windwosWidth: number;
    public shown: boolean;

    

    @ViewChild('sidenav') public sideNav: ElementRef;
    @ViewChild('navbar') public navbar: ElementRef;
    @Input('fixedNavbar') public isNavbarFixed: boolean = false;
    @Input('fixedSidenav') public isSidenavFixed: boolean = false;
    @ViewChild('overlay') public overlay: any;

    @Input('navbarClass') public navbarClass: string;
    @Input('scrolling') public isScrolling:boolean = false;


    constructor( public el: ElementRef,
                 public renderer: Renderer) {
    }

    ngAfterViewInit() {
        // pobraneie szerokosci okna po init
        this.windwosWidth = window.innerWidth;

        if(this.isSidenavFixed) {
            this.renderer.setElementClass(document.body, "fixed-sn", true);

            if(this.windwosWidth < 1441) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
            } else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(0%)");
            }
        } else {
            this.renderer.setElementClass(document.body, "hidden-sn", true);
            this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
        }

        if(this.isScrolling) {
            this.renderer.setElementClass(this.navbar.nativeElement, "scrolling-navbar", true);
            this.renderer.setElementClass(this.navbar.nativeElement, "fixed-top", true);
        }
    }

    windwosResize() {
        this.windwosWidth = window.innerWidth;

        if(this.isSidenavFixed) {
            if(this.windwosWidth < 1441 && !this.shown) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
            } else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(0%)");
            }

            if(this.windwosWidth > 1440 && this.shown) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
                this.hideOverlay();
                this.shown = false;
            }
       } else {
            if(this.windwosWidth > 1440) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
                this.hideOverlay();
                this.shown = false;
            }
       }


        
    }


    showSideNav() {
        if(this.isSidenavFixed) {
            if(this.windwosWidth < 1441) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(0%)");
                this.showOverlay();
            } else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(0%)");
            }
        } else {
            this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(0%)");
            this.showOverlay();
        }
       
    }

    hiddeSideNav() {
         if(this.isSidenavFixed) {
            if(this.windwosWidth < 1441) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
                this.hideOverlay();
            } else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
            }
        } else {
            this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(-100%)");
            this.hideOverlay();
        }
    }

    showOverlay() {
        this.renderer.setElementStyle(this.overlay.nativeElement, "display", "block");
        this.renderer.setElementStyle(this.overlay.nativeElement, "opacity", "1");
    }

    hideOverlay() {
        this.renderer.setElementStyle(this.overlay.nativeElement, "opacity", "0");
        setTimeout(() => {
            this.renderer.setElementStyle(this.overlay.nativeElement, "display", "none");
        }, 250);
    }

    scrolling(event: any) {
        if(this.isScrolling) {
            if(window.pageYOffset > 120 && this.windwosWidth > 992) {
                this.renderer.setElementClass(this.navbar.nativeElement, "top-nav-collapse", true);
            } else {
                this.renderer.setElementClass(this.navbar.nativeElement, "top-nav-collapse", false);
            }
        }
    }


}