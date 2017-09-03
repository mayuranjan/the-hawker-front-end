import { Directive, ElementRef, Renderer, Input, HostListener } from '@angular/core';
var charCounter = (function () {
    function charCounter(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
        this.maxChar = 20;
    }
    charCounter.prototype.ngOnInit = function () {
        this.textContainer = this._renderer.createElement(this._elRef.nativeElement.parentElement, 'p');
        this._renderer.setElementClass(this.textContainer, "chars", true);
        this.textContainer.innerHTML = "0/" + this.maxChar;
        this._renderer.setElementStyle(this.textContainer, "display", "none");
    };
    charCounter.prototype.onKeyUp = function () {
        this.textContainer.innerHTML = this._elRef.nativeElement.value.length + "/" + this.maxChar;
        if (this._elRef.nativeElement.value.length > this.maxChar) {
            this._renderer.setElementClass(this._elRef.nativeElement, "invalid", true);
        }
        else {
            this._renderer.setElementClass(this._elRef.nativeElement, "invalid", false);
        }
    };
    charCounter.prototype.hide = function () {
        this._renderer.setElementStyle(this.textContainer, "display", "none");
    };
    charCounter.prototype.show = function () {
        this._renderer.setElementStyle(this.textContainer, "display", "block");
    };
    return charCounter;
}());
export { charCounter };
charCounter.decorators = [
    { type: Directive, args: [{
                selector: '[charCounter]'
            },] },
];
charCounter.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
charCounter.propDecorators = {
    'maxChar': [{ type: Input },],
    'onKeyUp': [{ type: HostListener, args: ['keyup', ['$event'],] },],
    'hide': [{ type: HostListener, args: ['blur', ['$event'],] },],
    'show': [{ type: HostListener, args: ['focus', ['$event'],] },],
};
//# sourceMappingURL=charCounter.js.map