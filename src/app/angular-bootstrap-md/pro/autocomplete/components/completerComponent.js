"use strict";
import { Component, Input, Output, EventEmitter, ViewChild, forwardRef } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CtrCompleter } from "../directives/completerDirective";
import { CompleterService } from "../services/completerService";
import { MAX_CHARS, MIN_SEARCH_LENGTH, PAUSE, TEXT_SEARCHING, TEXT_NO_RESULTS } from "../globals";
import "rxjs/add/operator/catch";
var noop = function () { };
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CompleterCmp; }),
    multi: true
};
var CompleterCmp = (function () {
    function CompleterCmp(completerService) {
        this.completerService = completerService;
        this.inputName = "";
        this.inputId = "";
        this.pause = PAUSE;
        this.minSearchLength = MIN_SEARCH_LENGTH;
        this.maxChars = MAX_CHARS;
        this.overrideSuggested = false;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.fillHighlighted = true;
        this.placeholder = "";
        this.autoMatch = false;
        this.disableInput = false;
        this.autofocus = false;
        this.openOnFocus = false;
        this.autoHighlight = false;
        this.focused = false;
        this.selected = new EventEmitter();
        this.highlighted = new EventEmitter();
        this.blur = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.opened = new EventEmitter();
        this.keyup = new EventEmitter();
        this.keydown = new EventEmitter();
        this.searchStr = "";
        this.control = new FormControl("");
        this.displaySearching = true;
        this.displayNoResults = true;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._focus = false;
        this._open = false;
        this._textNoResults = TEXT_NO_RESULTS;
        this._textSearching = TEXT_SEARCHING;
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: function () { return this.searchStr; },
        set: function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
            }
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    CompleterCmp.prototype.ngAfterViewInit = function () {
        if (this.autofocus) {
            this._focus = true;
        }
    };
    CompleterCmp.prototype.ngAfterViewChecked = function () {
        if (this._focus) {
            this.ctrInput.nativeElement.focus();
            this._focus = false;
        }
    };
    CompleterCmp.prototype.onTouched = function () {
        this._onTouchedCallback();
    };
    CompleterCmp.prototype.writeValue = function (value) {
        this.searchStr = value;
    };
    CompleterCmp.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    CompleterCmp.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    Object.defineProperty(CompleterCmp.prototype, "datasource", {
        set: function (source) {
            if (source) {
                if (source instanceof Array) {
                    this.dataService = this.completerService.local(source);
                }
                else if (typeof (source) === "string") {
                    this.dataService = this.completerService.remote(source);
                }
                else {
                    this.dataService = source;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
        set: function (text) {
            if (this._textNoResults != text) {
                this._textNoResults = text;
                this.displayNoResults = this._textNoResults && this._textNoResults !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textSearching", {
        set: function (text) {
            if (this._textSearching != text) {
                this._textSearching = text;
                this.displaySearching = this._textSearching && this._textSearching !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    CompleterCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        this.completer.opened.subscribe(function (isOpen) {
            _this._open = isOpen;
            _this.opened.emit(isOpen);
        });
    };
    CompleterCmp.prototype.onBlur = function () {
        this.blur.emit();
        this.onTouched();
        if (this.searchStr === undefined || this.searchStr === "") {
            this.focused = false;
        }
    };
    CompleterCmp.prototype.onFocus = function () {
        this.focusEvent.emit();
        this.onTouched();
        this.focused = true;
    };
    CompleterCmp.prototype.onKeyup = function (event) {
        this.keyup.emit(event);
    };
    CompleterCmp.prototype.onKeydown = function (event) {
        this.keydown.emit(event);
    };
    CompleterCmp.prototype.onChange = function (value) {
        this.value = value;
    };
    CompleterCmp.prototype.open = function () {
        this.completer.open();
    };
    CompleterCmp.prototype.close = function () {
        this.completer.clear();
    };
    CompleterCmp.prototype.focus = function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.focus();
        }
        else {
            this._focus = true;
        }
    };
    CompleterCmp.prototype.isOpen = function () {
        return this._open;
    };
    return CompleterCmp;
}());
export { CompleterCmp };
CompleterCmp.decorators = [
    { type: Component, args: [{
                selector: "ng2-completer",
                template: "\n        <div class=\"completer-holder md-form\" ctrCompleter>\n            \n            <input #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\" class=\"completer-input form-control mdb-autocomplete\" ctrInput [ngClass]=\"inputClass\" \n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\" [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\" \n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\" \n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n            <label [ngClass]=\"{'active': focused}\">{{ label }}</label>\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown *ngIf=\"isInitialized && isOpen && ((items.length > 0 || displayNoResults) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{_textSearching}}</div>\n                    <div *ngIf=\"!searchActive && (!items || items.length === 0)\" class=\"completer-no-results\">{{_textNoResults}}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\" [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\" class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
            },] },
];
CompleterCmp.ctorParameters = function () { return [
    { type: CompleterService, },
]; };
CompleterCmp.propDecorators = {
    'dataService': [{ type: Input },],
    'inputName': [{ type: Input },],
    'inputId': [{ type: Input },],
    'pause': [{ type: Input },],
    'minSearchLength': [{ type: Input },],
    'maxChars': [{ type: Input },],
    'overrideSuggested': [{ type: Input },],
    'clearSelected': [{ type: Input },],
    'clearUnselected': [{ type: Input },],
    'fillHighlighted': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'matchClass': [{ type: Input },],
    'fieldTabindex': [{ type: Input },],
    'autoMatch': [{ type: Input },],
    'disableInput': [{ type: Input },],
    'inputClass': [{ type: Input },],
    'autofocus': [{ type: Input },],
    'openOnFocus': [{ type: Input },],
    'initialValue': [{ type: Input },],
    'autoHighlight': [{ type: Input },],
    'label': [{ type: Input },],
    'selected': [{ type: Output },],
    'highlighted': [{ type: Output },],
    'blur': [{ type: Output },],
    'focusEvent': [{ type: Output, args: ["focus",] },],
    'opened': [{ type: Output },],
    'keyup': [{ type: Output },],
    'keydown': [{ type: Output },],
    'completer': [{ type: ViewChild, args: [CtrCompleter,] },],
    'ctrInput': [{ type: ViewChild, args: ["ctrInput",] },],
    'datasource': [{ type: Input },],
    'textNoResults': [{ type: Input },],
    'textSearching': [{ type: Input },],
};
//# sourceMappingURL=completerComponent.js.map