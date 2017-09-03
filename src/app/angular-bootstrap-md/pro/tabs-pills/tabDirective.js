import { Directive, EventEmitter, HostBinding, Input, Output, ElementRef } from '@angular/core';
import { TabsetComponent } from './tabsetComponent';
var TabDirective = (function () {
    function TabDirective(tabset, el) {
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        this.removed = new EventEmitter();
        this.addClass = true;
        this.test = true;
        this.el = null;
        this.el = el;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this.removeClass(this.el.nativeElement, 'show');
                    setTimeout(function () {
                        _this._active = active;
                        _this.deselect.emit(_this);
                    }, 150);
                }
                return;
            }
            setTimeout(function () {
                _this._active = active;
                _this.classAdd(_this.el.nativeElement, 'show');
            }, 150);
            this.select.emit(this);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnInit = function () {
        this.removable = this.removable;
    };
    TabDirective.prototype.hasClass = function (el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };
    TabDirective.prototype.classAdd = function (el, className) {
        if (el.classList)
            el.classList.add(className);
        else if (!this.hasClass(el, className))
            el.className += " " + className;
    };
    TabDirective.prototype.removeClass = function (el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };
    return TabDirective;
}());
export { TabDirective };
TabDirective.decorators = [
    { type: Directive, args: [{ selector: 'tab, [tab]' },] },
];
TabDirective.ctorParameters = function () { return [
    { type: TabsetComponent, },
    { type: ElementRef, },
]; };
TabDirective.propDecorators = {
    'heading': [{ type: Input },],
    'disabled': [{ type: Input },],
    'removable': [{ type: Input },],
    'customClass': [{ type: Input },],
    'active': [{ type: HostBinding, args: ['class.active',] }, { type: Input },],
    'select': [{ type: Output },],
    'deselect': [{ type: Output },],
    'removed': [{ type: Output },],
    'addClass': [{ type: HostBinding, args: ['class.tab-pane',] },],
    'test': [{ type: HostBinding, args: ['class.fade',] },],
};
//# sourceMappingURL=tabDirective.js.map