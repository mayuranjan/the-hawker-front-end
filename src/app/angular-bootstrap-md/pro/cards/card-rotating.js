import { Component } from '@angular/core';
var CardRotating = (function () {
    function CardRotating() {
        this.rotate = false;
    }
    CardRotating.prototype.toggle = function () {
        this.rotate = !this.rotate;
    };
    return CardRotating;
}());
export { CardRotating };
CardRotating.decorators = [
    { type: Component, args: [{
                selector: 'card-rotating',
                template: "\n\n    <div class=\"flip-container card-wrapper\" [ngClass]=\"{'rotate': rotate}\">\n\t\t<div class=\"flipper card-rotating effect__click tp-box\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n    "
            },] },
];
CardRotating.ctorParameters = function () { return []; };
//# sourceMappingURL=card-rotating.js.map