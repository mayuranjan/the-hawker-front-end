import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgTranscludeDirective } from './transcludeDirective';
import { TabHeadingDirective } from './tabHeadingDirective';
import { TabDirective } from './tabDirective';
import { TabsetComponent } from './tabsetComponent';
import { TabsetConfig } from './tabsetConfig';
import { RippleDirective } from './ripple-effect.component';
var TabsModule = (function () {
    function TabsModule() {
    }
    TabsModule.forRoot = function () {
        return {
            ngModule: TabsModule,
            providers: [TabsetConfig]
        };
    };
    return TabsModule;
}());
export { TabsModule };
TabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective, RippleDirective],
                exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective, RippleDirective]
            },] },
];
TabsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tabsetModule.js.map