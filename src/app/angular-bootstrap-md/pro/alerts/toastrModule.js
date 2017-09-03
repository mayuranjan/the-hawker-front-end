import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from './toastComponent';
import { ToastrService } from './toastrService';
import { ToastrConfig } from './toastrConfig';
import { OverlayContainer } from './overlay/overlay-container';
import { Overlay } from './overlay/overlay';
export var TOAST_CONFIG = new OpaqueToken('ToastConfig');
export function provideToastrConfig(config) {
    return new ToastrConfig(config);
}
var ToastrModule = (function () {
    function ToastrModule() {
    }
    ToastrModule.forRoot = function (config) {
        return {
            ngModule: ToastrModule,
            providers: [
                { provide: TOAST_CONFIG, useValue: config },
                { provide: ToastrConfig, useFactory: provideToastrConfig, deps: [TOAST_CONFIG] },
                OverlayContainer,
                Overlay,
                ToastrService
            ]
        };
    };
    return ToastrModule;
}());
export { ToastrModule };
ToastrModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Toast],
                declarations: [Toast],
                entryComponents: [Toast],
            },] },
];
ToastrModule.ctorParameters = function () { return []; };
//# sourceMappingURL=toastrModule.js.map