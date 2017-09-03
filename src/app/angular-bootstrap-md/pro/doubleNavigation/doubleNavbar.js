import { Component, ElementRef, Renderer, Input, ViewChild } from '@angular/core';
var DoubleNavbar = (function () {
    function DoubleNavbar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.isNavbarFixed = false;
        this.isSidenavFixed = false;
        this.isScrolling = false;
    }
    DoubleNavbar.prototype.ngAfterViewInit = function () {
        this.windwosWidth = window.innerWidth;
        if (this.isSidenavFixed) {
            this.renderer.setElementClass(document.body, "fixed-sn", true);
            if (this.windwosWidth < 1441) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
            }
            else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(0%)");
            }
        }
        else {
            this.renderer.setElementClass(document.body, "hidden-sn", true);
            this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
        }
        if (this.isScrolling) {
            this.renderer.setElementClass(this.navbar.nativeElement, "scrolling-navbar", true);
            this.renderer.setElementClass(this.navbar.nativeElement, "fixed-top", true);
        }
    };
    DoubleNavbar.prototype.windwosResize = function () {
        this.windwosWidth = window.innerWidth;
        if (this.isSidenavFixed) {
            if (this.windwosWidth < 1441 && !this.shown) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
            }
            else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(0%)");
            }
            if (this.windwosWidth > 1440 && this.shown) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
                this.hideOverlay();
                this.shown = false;
            }
        }
        else {
            if (this.windwosWidth > 1440) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
                this.hideOverlay();
                this.shown = false;
            }
        }
    };
    DoubleNavbar.prototype.showSideNav = function () {
        if (this.isSidenavFixed) {
            if (this.windwosWidth < 1441) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(0%)");
                this.showOverlay();
            }
            else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(0%)");
            }
        }
        else {
            this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(0%)");
            this.showOverlay();
        }
    };
    DoubleNavbar.prototype.hiddeSideNav = function () {
        if (this.isSidenavFixed) {
            if (this.windwosWidth < 1441) {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
                this.hideOverlay();
            }
            else {
                this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
            }
        }
        else {
            this.renderer.setElementStyle(this.sideNav.nativeElement, "transform", "translateX(-100%)");
            this.hideOverlay();
        }
    };
    DoubleNavbar.prototype.showOverlay = function () {
        this.renderer.setElementStyle(this.overlay.nativeElement, "display", "block");
        this.renderer.setElementStyle(this.overlay.nativeElement, "opacity", "1");
    };
    DoubleNavbar.prototype.hideOverlay = function () {
        var _this = this;
        this.renderer.setElementStyle(this.overlay.nativeElement, "opacity", "0");
        setTimeout(function () {
            _this.renderer.setElementStyle(_this.overlay.nativeElement, "display", "none");
        }, 250);
    };
    DoubleNavbar.prototype.scrolling = function (event) {
        if (this.isScrolling) {
            if (window.pageYOffset > 120 && this.windwosWidth > 992) {
                this.renderer.setElementClass(this.navbar.nativeElement, "top-nav-collapse", true);
            }
            else {
                this.renderer.setElementClass(this.navbar.nativeElement, "top-nav-collapse", false);
            }
        }
    };
    return DoubleNavbar;
}());
export { DoubleNavbar };
DoubleNavbar.decorators = [
    { type: Component, args: [{
                selector: 'DoubleNavbar',
                template: "\n    <header>\n        <ul #sidenav class=\"side-nav fixed sn-bg-1\">\n            <ng-content select=\"SideNav\"></ng-content>\n            <div class=\"sidenav-bg mask-strong\"></div>\n        </ul>\n        <nav #navbar class=\"navbar double-nav {{ navbarClass }}\">\n            <div class=\"float-left\">\n                <a (click)=\"showSideNav(); shown = true;\" data-activates=\"slide-out\" class=\"button-collapse\"><i class=\"fa fa-bars\"></i></a>\n            </div>\n            <div class=\"breadcrumb-dn mr-auto\">\n                <ng-content select=\"breadcrumb\"></ng-content>\n            </div>\n            <ul class=\"nav navbar-nav nav-flex-icons ml-auto\">\n                <ng-content select=\"links\"></ng-content>\n            </ul>\n        </nav>\n        <div #overlay id=\"sidenav-overlay\" style=\"opacity: 0; display: none;\" (click)=\"hiddeSideNav(); shown = false\"></div>\n    </header>\n    ",
                host: {
                    '(window:resize)': 'windwosResize()',
                    '(window:scroll)': 'scrolling($event)'
                }
            },] },
];
DoubleNavbar.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
DoubleNavbar.propDecorators = {
    'sideNav': [{ type: ViewChild, args: ['sidenav',] },],
    'navbar': [{ type: ViewChild, args: ['navbar',] },],
    'isNavbarFixed': [{ type: Input, args: ['fixedNavbar',] },],
    'isSidenavFixed': [{ type: Input, args: ['fixedSidenav',] },],
    'overlay': [{ type: ViewChild, args: ['overlay',] },],
    'navbarClass': [{ type: Input, args: ['navbarClass',] },],
    'isScrolling': [{ type: Input, args: ['scrolling',] },],
};
//# sourceMappingURL=doubleNavbar.js.map