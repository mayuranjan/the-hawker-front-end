import { Component } from '@angular/core';
import { socialsState } from '../animations/animations';
var CardReveal = (function () {
    function CardReveal() {
    }
    CardReveal.prototype.toggle = function () {
        this.show = !this.show;
        this.socials = (this.socials === 'active') ? 'inactive' : 'active';
    };
    return CardReveal;
}());
export { CardReveal };
CardReveal.decorators = [
    { type: Component, args: [{
                selector: 'card-reveal',
                template: "\n\n    <div class=\"card-overflow col-12\">\n        <div class=\"card-front\">\n            <ng-content select=\"card-front\" ></ng-content>\n        </div>\n        <div class=\"card-revealed\" *ngIf=\"show\" [@socialsState]=\"socials\">\n            <ng-content select=\"card-revealed\" ></ng-content>\n        </div>\n    </div>\n    ",
                animations: [socialsState]
            },] },
];
CardReveal.ctorParameters = function () { return []; };
//# sourceMappingURL=card-reveal.js.map