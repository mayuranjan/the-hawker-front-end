import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ImageModal } from './image-popup';
var LightBoxModule = (function () {
    function LightBoxModule() {
    }
    return LightBoxModule;
}());
export { LightBoxModule };
LightBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [ImageModal],
                exports: [ImageModal]
            },] },
];
LightBoxModule.ctorParameters = function () { return []; };
//# sourceMappingURL=LightBoxModule.js.map