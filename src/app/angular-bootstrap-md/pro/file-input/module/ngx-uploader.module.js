import { NgModule } from '@angular/core';
import { NgFileDropDirective } from '../directives/ng-file-drop.directive';
import { NgFileSelectDirective } from '../directives/ng-file-select.directive';
var NgUploaderModule = (function () {
    function NgUploaderModule() {
    }
    return NgUploaderModule;
}());
export { NgUploaderModule };
NgUploaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgFileSelectDirective,
                    NgFileDropDirective
                ],
                exports: [
                    NgFileSelectDirective,
                    NgFileDropDirective
                ]
            },] },
];
NgUploaderModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ngx-uploader.module.js.map