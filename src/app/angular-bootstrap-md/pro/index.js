import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Ng2CompleterModule } from './autocomplete';
import { CardsModule } from './cards/';
import { NgUploaderModule } from './file-input/';
import { MaterialChipsModule } from './tags/';
import { ProgressBars } from './progress-bars/';
import { TabsModule } from './tabs-pills/';
import { ToastrModule } from './alerts/';
import { SelectModule } from './material-select/';
import { MyDatePickerModule } from './date-picker/';
import { timepickerModule } from './time-picker/';
import { LightBoxModule } from './lightbox/LightBoxModule';
import { SidenavModule } from './sidenav/';
import { chartSimpleModule } from './easy-charts/';
import { SqueezeBoxModule } from './accordion/';
import { NguiStickyModule } from './stickyContent/';
import { Ng2PageScrollModule } from './smoothscroll/index';
import { charCounterModule } from './inputs/';
import { DoubleNavbarModule } from './doubleNavigation/';
export { Ng2CompleterModule, CompleterCmp, CompleterListItemCmp, CompleterService, LocalDataFactoryProvider, RemoteDataFactoryProvider, CtrCompleter, CtrDropdown, CtrInput, CtrList, CtrRow } from './autocomplete/';
export { CardsModule, CardRotating, CardReveal } from './cards/';
export { ProgressbarComponent, ProgressbarConfig, ProgressbarModule, ProgressBars, ProgressDirective, ProgressSpinnerComponent, BarComponent } from './progress-bars/';
export { MaterialChipsComponent, MaterialChipsModule } from './tags/';
export { TabDirective, TabHeadingDirective, TabsetComponent, TabsetConfig, TabsModule, NgTranscludeDirective } from './tabs-pills/';
export { NgSpinningPreloader } from './preloader/preloaderService';
export { Toast, ToastConfig, ToastContainerDirective, ToastContainerModule, ToastData, ToastrConfig, ToastRef, ToastrModule, ToastrService, BasePortalHost, Overlay, OverlayContainer, OverlayRef, ComponentPortal } from './alerts/';
export { SelectModule, Diacritics, Option, OptionList, SELECT_VALUE_ACCESSOR, SelectComponent, SelectDropdownComponent } from './material-select/';
export { MyDatePicker, MyDatePickerModule, InputAutoFillDirective, MYDP_VALUE_ACCESSOR, UtilService, LocaleService, FocusDirective } from './date-picker/';
export { timepickerModule, ClockPicker } from './time-picker/';
export { LightBoxModule, ImageModal } from './lightbox/';
export { SidenavComponent, SidenavModule } from './sidenav/';
export { chartSimpleModule, EasyPieChartComponent, SimpleChartComponent } from './easy-charts/';
export { SBItem, SBItemBody, SBItemHead, SqueezeBox, SqueezeBoxModule } from './accordion/';
export { NguiStickyDirective, NguiStickyModule } from './stickyContent/';
export { Ng2PageScrollModule, PageScroll, PageScrollConfig, PageScrollInstance, PageScrollService, PageScrollUtilService, EasingLogic } from './smoothscroll/';
export { charCounter, charCounterModule } from './inputs';
export { DOUBLE_NAVBAR_COMPONENTS, DoubleNavbarModule } from './doubleNavigation/';
export { NgFileDropDirective, NgFileSelectDirective, NgUploaderModule, NgUploaderService } from './file-input';
var MODULES = [
    Ng2CompleterModule,
    CardsModule,
    NgUploaderModule,
    MaterialChipsModule,
    ProgressBars,
    TabsModule,
    ToastrModule,
    SelectModule,
    MyDatePickerModule,
    timepickerModule,
    LightBoxModule,
    SidenavModule,
    chartSimpleModule,
    SqueezeBoxModule,
    NguiStickyModule,
    Ng2PageScrollModule,
    charCounterModule,
    DoubleNavbarModule,
];
var MDBRootModulePro = (function () {
    function MDBRootModulePro() {
    }
    return MDBRootModulePro;
}());
export { MDBRootModulePro };
MDBRootModulePro.decorators = [
    { type: NgModule, args: [{
                imports: [
                    Ng2CompleterModule,
                    CardsModule.forRoot(),
                    MaterialChipsModule,
                    ProgressBars.forRoot(),
                    TabsModule.forRoot(),
                    ToastrModule.forRoot(),
                    SelectModule,
                    MyDatePickerModule,
                    timepickerModule,
                    LightBoxModule,
                    SidenavModule,
                    chartSimpleModule,
                    SqueezeBoxModule,
                    NguiStickyModule,
                    Ng2PageScrollModule.forRoot(),
                    charCounterModule.forRoot(),
                    DoubleNavbarModule,
                ],
                exports: MODULES,
                providers: [],
                schemas: [NO_ERRORS_SCHEMA]
            },] },
];
MDBRootModulePro.ctorParameters = function () { return []; };
var MDBBootstrapModulePro = (function () {
    function MDBBootstrapModulePro() {
    }
    MDBBootstrapModulePro.forRoot = function () {
        return { ngModule: MDBRootModulePro };
    };
    return MDBBootstrapModulePro;
}());
export { MDBBootstrapModulePro };
MDBBootstrapModulePro.decorators = [
    { type: NgModule, args: [{ exports: MODULES },] },
];
MDBBootstrapModulePro.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map