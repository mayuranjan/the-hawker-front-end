'use strict';
import { Directive, ElementRef, Input } from '@angular/core';
import { computedStyle } from './computed-style';
var NguiStickyDirective = (function () {
    function NguiStickyDirective(el) {
        var _this = this;
        this.stickyOffsetTop = 0;
        this.scrollHandler = function () {
            var parentRect = _this.el.parentElement.getBoundingClientRect();
            var bodyRect = document.body.getBoundingClientRect();
            var dynProps;
            if (_this.original.float === 'right') {
                var right = bodyRect.right - parentRect.right + _this.original.marginRight;
                dynProps = { right: right + 'px' };
            }
            else if (_this.original.float === 'left') {
                var left = parentRect.left - bodyRect.left + _this.original.marginLeft;
                dynProps = { left: left + 'px' };
            }
            else {
                dynProps = { width: parentRect.width + 'px' };
            }
            if (_this.original.marginTop + _this.original.marginBottom +
                _this.original.boundingClientRect.height + _this.stickyOffsetTop >= parentRect.bottom) {
                var floatAdjustment = _this.original.float === 'right' ? { right: 0 } :
                    _this.original.float === 'left' ? { left: 0 } : {};
                Object.assign(_this.el.style, {
                    position: 'absolute',
                    float: 'none',
                    top: 'inherit',
                    bottom: 0
                }, dynProps, floatAdjustment);
            }
            else if (parentRect.top * -1 + _this.original.marginTop + _this.stickyOffsetTop > _this.original.offsetTop) {
                if (_this.original.float !== 'left' && _this.original.float !== 'right' && !_this.fillerEl) {
                    _this.fillerEl = document.createElement('div');
                    _this.fillerEl.style.height = _this.el.offsetHeight + 'px';
                    _this.parentEl.insertBefore(_this.fillerEl, _this.el);
                }
                Object.assign(_this.el.style, {
                    position: 'fixed',
                    float: 'none',
                    top: _this.stickyOffsetTop + 'px',
                    bottom: 'inherit'
                }, dynProps);
            }
            else {
                if (_this.fillerEl) {
                    _this.parentEl.removeChild(_this.fillerEl);
                    _this.fillerEl = undefined;
                }
                Object.assign(_this.el.style, {
                    position: _this.original.position,
                    float: _this.original.float,
                    top: _this.original.top,
                    bottom: _this.original.bottom,
                    width: _this.original.width,
                    left: _this.original.left
                }, dynProps);
            }
        };
        this.el = this.el = el.nativeElement;
        this.parentEl = this.el.parentElement;
    }
    NguiStickyDirective.prototype.ngAfterViewInit = function () {
        this.el.style.boxSizing = 'border-box';
        if (this.stickyAfter) {
            var cetStickyAfterEl = document.querySelector(this.stickyAfter);
            if (cetStickyAfterEl) {
                this.stickyOffsetTop = cetStickyAfterEl.getBoundingClientRect().bottom;
            }
        }
        var allowedPositions = ['absolute', 'fixed', 'relative'];
        var parentElPosition = computedStyle(this.parentEl, 'position');
        if (allowedPositions.indexOf(parentElPosition) === -1) {
            this.parentEl.style.position = 'relative';
        }
        this.diff = {
            top: this.el.offsetTop - this.parentEl.offsetTop,
            left: this.el.offsetLeft - this.parentEl.offsetLeft
        };
        var elRect = this.el.getBoundingClientRect();
        this.original = {
            boundingClientRect: elRect,
            position: computedStyle(this.el, 'position'),
            float: computedStyle(this.el, 'float'),
            top: computedStyle(this.el, 'top'),
            bottom: computedStyle(this.el, 'bottom'),
            left: computedStyle(this.el, 'left'),
            width: computedStyle(this.el, 'width'),
            offsetTop: this.el.offsetTop,
            offsetLeft: this.el.offsetLeft,
            marginTop: parseInt(computedStyle(this.el, 'marginTop')),
            marginBottom: parseInt(computedStyle(this.el, 'marginBottom')),
            marginLeft: parseInt(computedStyle(this.el, 'marginLeft')),
            marginRight: parseInt(computedStyle(this.el, 'marginLeft'))
        };
        this.attach();
    };
    NguiStickyDirective.prototype.ngOnDestroy = function () {
        this.detach();
    };
    NguiStickyDirective.prototype.attach = function () {
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
    };
    NguiStickyDirective.prototype.detach = function () {
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.scrollHandler);
    };
    return NguiStickyDirective;
}());
export { NguiStickyDirective };
NguiStickyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngui-sticky]'
            },] },
];
NguiStickyDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
NguiStickyDirective.propDecorators = {
    'stickyAfter': [{ type: Input, args: ['sticky-after',] },],
};
//# sourceMappingURL=stickyContentDirective.js.map