var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { NgModule, Directive, OpaqueToken, Inject, Optional, isDevMode, ElementRef, } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdError } from '../errors/errors';
var hasDoneGlobalChecks = false;
export var MATERIAL_COMPATIBILITY_MODE = new OpaqueToken('md-compatibility-mode');
var MdCompatibilityInvalidPrefixError = (function (_super) {
    __extends(MdCompatibilityInvalidPrefixError, _super);
    function MdCompatibilityInvalidPrefixError(prefix, nodeName) {
        return _super.call(this, "The \"" + prefix + "-\" prefix cannot be used in ng-material v1 compatibility mode. " +
            ("It was used on an \"" + nodeName.toLowerCase() + "\" element.")) || this;
    }
    return MdCompatibilityInvalidPrefixError;
}(MdError));
export { MdCompatibilityInvalidPrefixError };
export var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-dialog-actions],\n  [mat-dialog-close],\n  [mat-dialog-content],\n  [mat-dialog-title],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-menu-trigger-for],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [mat-tab-label],\n  [mat-tab-link],\n  [mat-tab-nav-bar],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-button-toggle,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-group,\n  mat-toolbar,\n  mat-error";
export var MD_ELEMENTS_SELECTOR = "\n  [md-button],\n  [md-dialog-actions],\n  [md-dialog-close],\n  [md-dialog-content],\n  [md-dialog-title],\n  [md-fab],\n  [md-icon-button],\n  [md-menu-trigger-for],\n  [md-mini-fab],\n  [md-raised-button],\n  [md-tab-label],\n  [md-tab-link],\n  [md-tab-nav-bar],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-button-toggle,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-group,\n  md-toolbar,\n  md-error";
var MatPrefixRejector = (function () {
    function MatPrefixRejector(isCompatibilityMode, elementRef) {
        if (!isCompatibilityMode) {
            throw new MdCompatibilityInvalidPrefixError('mat', elementRef.nativeElement.nodeName);
        }
    }
    return MatPrefixRejector;
}());
export { MatPrefixRejector };
MatPrefixRejector.decorators = [
    { type: Directive, args: [{ selector: MAT_ELEMENTS_SELECTOR },] },
];
MatPrefixRejector.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
    { type: ElementRef, },
]; };
var MdPrefixRejector = (function () {
    function MdPrefixRejector(isCompatibilityMode, elementRef) {
        if (isCompatibilityMode) {
            throw new MdCompatibilityInvalidPrefixError('md', elementRef.nativeElement.nodeName);
        }
    }
    return MdPrefixRejector;
}());
export { MdPrefixRejector };
MdPrefixRejector.decorators = [
    { type: Directive, args: [{ selector: MD_ELEMENTS_SELECTOR },] },
];
MdPrefixRejector.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
    { type: ElementRef, },
]; };
var CompatibilityModule = (function () {
    function CompatibilityModule(_document) {
        this._document = _document;
        if (!hasDoneGlobalChecks && isDevMode()) {
            this._checkDoctype();
            this._checkTheme();
            hasDoneGlobalChecks = true;
        }
    }
    CompatibilityModule.forRoot = function () {
        return {
            ngModule: CompatibilityModule,
            providers: [],
        };
    };
    CompatibilityModule.prototype._checkDoctype = function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    CompatibilityModule.prototype._checkTheme = function () {
        if (this._document && typeof getComputedStyle === 'function') {
            var testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    };
    return CompatibilityModule;
}());
export { CompatibilityModule };
CompatibilityModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatPrefixRejector, MdPrefixRejector],
                exports: [MatPrefixRejector, MdPrefixRejector],
            },] },
];
CompatibilityModule.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
]; };
var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    return NoConflictStyleCompatibilityMode;
}());
export { NoConflictStyleCompatibilityMode };
NoConflictStyleCompatibilityMode.decorators = [
    { type: NgModule, args: [{
                providers: [{
                        provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                    }],
            },] },
];
NoConflictStyleCompatibilityMode.ctorParameters = function () { return []; };
//# sourceMappingURL=compatibility.js.map