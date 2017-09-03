import { Component, Input } from '@angular/core';
import { slideIn } from '../../pro/animations/animations';
var SidenavComponent = (function () {
    function SidenavComponent() {
        this.sidenavClass = null;
        this.slideInState = 'inactive';
        this.isActive = false;
    }
    SidenavComponent.prototype.collapse = function () {
        this.slideInState = (this.slideInState === 'inactive' ? 'active' : 'inactive');
        this.isActive = (this.isActive === false ? true : false);
    };
    SidenavComponent.prototype.backdrop = function () {
        this.slideInState = (this.slideInState === 'inactive' ? 'active' : 'inactive');
        this.isActive = (this.isActive === false ? true : false);
    };
    return SidenavComponent;
}());
export { SidenavComponent };
SidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'sidenav',
                template: "\n        <ul id=\"slide-out\" class=\"side-nav fixed sn-bg-1 custom-scrollbar {{ sidenavClass }}\" [@slideIn]=\"slideInState\" >\n           <ng-content></ng-content>\n        </ul>\n\n        <div (click)=\"backdrop()\" *ngIf=\"isActive\" class=\"modal-backdrop\"></div>\n\n    ",
                animations: [
                    slideIn
                ]
            },] },
];
SidenavComponent.ctorParameters = function () { return []; };
SidenavComponent.propDecorators = {
    'sidenavClass': [{ type: Input, args: ['sidenavClass',] },],
};
//# sourceMappingURL=sidenavComponent.js.map