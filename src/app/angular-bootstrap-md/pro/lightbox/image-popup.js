import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { zoomState, restartState } from '../../pro/animations/animations';
import 'hammerjs';
var ImageModal = (function () {
    function ImageModal(element) {
        this.element = element;
        this.opened = false;
        this.loading = false;
        this.showRepeat = false;
        this.isMobile = false;
        this.smooth = true;
        this.cancelEvent = new EventEmitter();
        this.zoomed = 'inactive';
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this._element = this.element.nativeElement;
        try {
            document.createEvent("TouchEvent");
            this.isMobile = true;
        }
        catch (err) {
            this.isMobile = false;
            return;
        }
    }
    ImageModal.prototype.toggleZoomed = function () {
        this.zoomed = (this.zoomed == 'inactive') ? 'active' : 'inactive';
        this.zoom = !this.zoom;
    };
    ImageModal.prototype.toggleRestart = function () {
        this.zoomed = (this.zoomed == 'inactive') ? 'active' : 'inactive';
    };
    ImageModal.prototype.ngOnInit = function () {
        this.loading = true;
        if (this.imagePointer >= 0) {
            this.showRepeat = false;
            this.openGallery(this.imagePointer);
        }
        else {
            this.showRepeat = true;
        }
    };
    ImageModal.prototype.closeGallery = function () {
        this.smooth = false;
        this.zoom = false;
        if (screenfull.enabled) {
            screenfull.exit();
        }
        this.opened = false;
        this.cancelEvent.emit(null);
    };
    ImageModal.prototype.prevImage = function () {
        this.loading = true;
        this.currentImageIndex--;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.modalImages.length - 1;
        }
        this.openGallery(this.currentImageIndex);
    };
    ImageModal.prototype.nextImage = function () {
        this.loading = true;
        this.currentImageIndex++;
        if (this.modalImages.length === this.currentImageIndex) {
            this.currentImageIndex = 0;
        }
        this.openGallery(this.currentImageIndex);
    };
    ImageModal.prototype.openGallery = function (index) {
        if (!index) {
            this.currentImageIndex = 1;
        }
        this.currentImageIndex = index;
        this.opened = true;
        for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex) {
                this.imgSrc = this.modalImages[i].img;
                this.loading = false;
                break;
            }
        }
    };
    ImageModal.prototype.fullScreen = function () {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    };
    Object.defineProperty(ImageModal.prototype, "is_iPhone_or_iPod", {
        get: function () {
            if (navigator && navigator.userAgent && navigator.userAgent != null) {
                var strUserAgent = navigator.userAgent.toLowerCase();
                var arrMatches = strUserAgent.match(/ipad/);
                if (arrMatches != null)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ImageModal.prototype.keyboardControl = function (event) {
        if (event.keyCode == 39) {
            this.nextImage();
        }
        if (event.keyCode == 37) {
            this.prevImage();
        }
    };
    ImageModal.prototype.swipe = function (event, action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (action == this.SWIPE_ACTION.RIGHT) {
            this.nextImage();
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.prevImage();
        }
    };
    return ImageModal;
}());
export { ImageModal };
ImageModal.decorators = [
    { type: Component, args: [{
                selector: 'ImageModal',
                animations: [zoomState, restartState],
                template: "\n    <div class=\"ng-gallery mdb-lightbox {{ type }}\" *ngIf=\"showRepeat\"> \n      <figure class=\"col-md-4\" *ngFor =\"let i of modalImages; let index = index\">\n        <img src=\"{{ !i.thumb ? i.img : i.thumb }}\" class=\"ng-thumb\" (click)=\"openGallery(index)\" alt=\"Image {{ index + 1 }}\" />\n      </figure>\n    </div>\n    <div  tabindex=\"0\" class=\"ng-overlay\" [class.hide_lightbox]=\"opened == false\">\n      <div class=\"top-bar\">\n        <span class=\"info-text\">{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span>      \n        <a class=\"close-popup\" (click)=\"closeGallery()\" (click)=\"toggleRestart()\">\n        </a>\n        <a *ngIf=\"!is_iPhone_or_iPod\" class=\"fullscreen-toogle\" [class.toggled]='fullscreen' (click)=\"fullScreen()\">\n        </a>\n        <a class=\"zoom-toogle\" [class.zoom]='zoom' (click)=\"toggleZoomed()\" *ngIf=\"!isMobile\">\n        </a>\n      </div>\n      <div class=\"ng-gallery-content\">\n        <!--<img *ngIf=\"!loading\" src=\"{{imgSrc}}\" (mousedown)=\"checkEvent($event)\" (mouseup)=\"setZoom($event)\" [class.zoom]='zoom' [class.smooth]='smooth' class=\"effect\" (swipeleft)=\"swipe($event, $event.type)\" (swiperight)=\"swipe($event, $event.type)\"/>-->\n        <img *ngIf=\"!loading\" src=\"{{imgSrc}}\" [class.smooth]='smooth' class=\"effect\" (swipeleft)=\"swipe($event, $event.type)\" (swiperight)=\"swipe($event, $event.type)\" (click)=\"toggleZoomed()\" [@zoomState]=\"zoomed\" [@restartState]=\"restart\"/>\n\n        <div class=\"uil-ring-css\" *ngIf=\"loading\">\n          <div></div>\n        </div>  \n        <a class=\"nav-left\" *ngIf=\"modalImages.length >1 && !isMobile\" (click)=\"prevImage()\" >\n          <span></span>\n        </a>\n        <a class=\"nav-right\" *ngIf=\"modalImages.length >1 && !isMobile\" (click)=\"nextImage()\">\n          <span></span>\n        </a>\n        \n      </div>\n    </div>\n\n    <div *ngIf=\"openModalWindow\">\n      <ImageModal [modalImages]=\"images\" [imagePointer]=\"imagePointer\" (cancelEvent)=\"cancelImageModel()\"></ImageModal>\n    </div>\n  ",
                host: {
                    '(document:keyup)': 'keyboardControl($event)'
                },
            },] },
];
ImageModal.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ImageModal.propDecorators = {
    'modalImages': [{ type: Input, args: ['modalImages',] },],
    'imagePointer': [{ type: Input, args: ['imagePointer',] },],
    'fullscreen': [{ type: Input, args: ['fullscreen',] },],
    'zoom': [{ type: Input, args: ['zoom',] },],
    'smooth': [{ type: Input, args: ['smooth',] },],
    'type': [{ type: Input, args: ['type',] },],
    'cancelEvent': [{ type: Output, args: ['cancelEvent',] },],
};
//# sourceMappingURL=image-popup.js.map