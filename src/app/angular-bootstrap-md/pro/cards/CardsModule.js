import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReveal } from './card-reveal';
import { CardRotating } from './card-rotating';
var CardsModule = (function () {
    function CardsModule() {
    }
    CardsModule.forRoot = function () {
        return { ngModule: CardsModule, providers: [] };
    };
    return CardsModule;
}());
export { CardsModule };
CardsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CardReveal, CardRotating],
                exports: [CardReveal, CardRotating]
            },] },
];
CardsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=CardsModule.js.map