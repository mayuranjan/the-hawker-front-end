import { Component, Input, ElementRef } from '@angular/core';
var ProgressSpinnerComponent = (function () {
    function ProgressSpinnerComponent(el) {
        this.addClass = 'spinner-blue-only';
        this.spinnerType = '';
        this.spinnerColor = 'rainbow';
        this.el = el;
    }
    ProgressSpinnerComponent.prototype.ngAfterViewInit = function () {
        var hostElem = this.el.nativeElement;
        var colorClass = this.spinnerColor;
        this.addClass = 'spinner-rainbow';
        switch (colorClass) {
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
    };
    ProgressSpinnerComponent.prototype.spinerRun = function () {
        var _this = this;
        var counter = 0;
        var hostElem = this.el.nativeElement;
        setInterval(function () {
            switch (counter) {
                case 0:
                    _this.addClass = 'spinner-red-only mat-progress-spinner ';
                    break;
                case 1:
                    _this.addClass = 'spinner-yellow-only mat-progress-spinner';
                    break;
                case 2:
                    _this.addClass = 'spinner-blue-only mat-progress-spinner';
                    break;
                case 3:
                    _this.addClass = 'spinner-green-only mat-progress-spinner';
                    break;
            }
            hostElem.children[0].children[0].className = " " + _this.addClass;
            if (counter < 3) {
                counter++;
            }
            else {
                counter = 0;
            }
        }, 1333);
    };
    return ProgressSpinnerComponent;
}());
export { ProgressSpinnerComponent };
ProgressSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'progress-spinner',
                template: "\n    <div class=\"preloader-wrapper {{spinnerType}}\">\n        <md-progress-spinner mode=\"indeterminate\"></md-progress-spinner>\n    </div>\n  ",
                styles: []
            },] },
];
ProgressSpinnerComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ProgressSpinnerComponent.propDecorators = {
    'spinnerType': [{ type: Input },],
    'spinnerColor': [{ type: Input },],
};
//# sourceMappingURL=progressSpinnerComponent.js.map