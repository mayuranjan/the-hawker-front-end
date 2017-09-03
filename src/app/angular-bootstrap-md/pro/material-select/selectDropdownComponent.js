import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
var SelectDropdownComponent = (function () {
    function SelectDropdownComponent() {
        this.close = new EventEmitter();
        this.optionClicked = new EventEmitter();
        this.singleFilterClick = new EventEmitter();
        this.singleFilterInput = new EventEmitter();
        this.singleFilterKeydown = new EventEmitter();
        this.disabledColor = '#fff';
        this.disabledTextColor = '9e9e9e';
    }
    SelectDropdownComponent.prototype.ngOnInit = function () {
        this.optionsReset();
    };
    SelectDropdownComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    };
    SelectDropdownComponent.prototype.ngAfterViewInit = function () {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    };
    SelectDropdownComponent.prototype.onSingleFilterClick = function (event) {
        this.singleFilterClick.emit(null);
    };
    SelectDropdownComponent.prototype.onSingleFilterInput = function (event) {
        this.singleFilterInput.emit(event.target.value);
    };
    SelectDropdownComponent.prototype.onSingleFilterKeydown = function (event) {
        this.singleFilterKeydown.emit(event);
    };
    SelectDropdownComponent.prototype.onOptionsWheel = function (event) {
        this.handleOptionsWheel(event);
    };
    SelectDropdownComponent.prototype.onOptionMouseover = function (option) {
        this.optionList.highlightOption(option);
    };
    SelectDropdownComponent.prototype.onOptionClick = function (option) {
        this.optionClicked.emit(option);
    };
    SelectDropdownComponent.prototype.optionsReset = function () {
        this.optionList.filter('');
        this.optionList.highlight();
    };
    SelectDropdownComponent.prototype.getOptionStyle = function (option) {
        if (option.highlighted) {
            var style = {};
            if (typeof this.highlightColor !== 'undefined') {
                style['background-color'] = this.highlightColor;
            }
            if (typeof this.highlightTextColor !== 'undefined') {
                style['color'] = this.highlightTextColor;
            }
            return style;
        }
        else {
            return {};
        }
    };
    SelectDropdownComponent.prototype.clearFilterInput = function () {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    };
    SelectDropdownComponent.prototype.moveHighlightedIntoView = function () {
        var list = this.optionsList.nativeElement;
        var listHeight = list.offsetHeight;
        var itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            var item = list.children[0].children[itemIndex];
            var itemHeight = item.offsetHeight;
            var itemTop = itemIndex * itemHeight;
            var itemBottom = itemTop + itemHeight;
            var viewTop = list.scrollTop;
            var viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    };
    SelectDropdownComponent.prototype.handleOptionsWheel = function (e) {
        var div = this.optionsList.nativeElement;
        var atTop = div.scrollTop === 0;
        var atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    };
    return SelectDropdownComponent;
}());
export { SelectDropdownComponent };
SelectDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-dropdown',
                template: "\n        <div class=\"dropdown-content\" [ngStyle]=\"{'top.px': top, 'left.px': left, 'width.px': width}\">\n\n            <div class=\"filter\"\n                *ngIf=\"!multiple && filterEnabled\">\n                <input\n                    #filterInput\n                    autocomplete=\"on\"\n                    [placeholder]=\"placeholder\"\n                    (click)=\"onSingleFilterClick($event)\"\n                    (input)=\"onSingleFilterInput($event)\"\n                    (keydown)=\"onSingleFilterKeydown($event)\">\n            </div>\n\n            <div class=\"options\"\n                #optionsList>\n                <ul class=\"select-dropdown\" [ngClass]=\"{'multiple-select-dropdown': multiple}\"\n                    (wheel)=\"onOptionsWheel($event)\">\n                    <li *ngFor=\"let option of optionList.filtered\"\n                        [ngClass]=\"{'active': option.highlighted, 'selected': option.selected, 'disabled': option.disabled, 'optgroup': option.group}\"\n                        [ngStyle]=\"getOptionStyle(option)\"\n                        (click)=\"onOptionClick(option)\"\n                        (mouseover)=\"onOptionMouseover(option)\">\n                        <img class=\"rounded-circle\" [src]=\"option.icon\" *ngIf=\"option.icon !== ''\">\n                        <span class=\"select-option\" *ngIf=\"!multiple\">{{option.label}}</span>\n                        <span class=\"filtrable\" *ngIf=\"multiple\">\n                            <input type=\"checkbox\" [checked]=\"option.selected\">\n                            <label></label>\n                            {{option.label}}\n                        </span>\n                    </li>\n                    <li\n                        *ngIf=\"!optionList.hasShown\"\n                        class=\"message disabled\">\n                        <span>{{notFoundMsg}}</span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
                encapsulation: ViewEncapsulation.None
            },] },
];
SelectDropdownComponent.ctorParameters = function () { return []; };
SelectDropdownComponent.propDecorators = {
    'filterEnabled': [{ type: Input },],
    'highlightColor': [{ type: Input },],
    'highlightTextColor': [{ type: Input },],
    'left': [{ type: Input },],
    'multiple': [{ type: Input },],
    'notFoundMsg': [{ type: Input },],
    'optionList': [{ type: Input },],
    'top': [{ type: Input },],
    'width': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'close': [{ type: Output },],
    'optionClicked': [{ type: Output },],
    'singleFilterClick': [{ type: Output },],
    'singleFilterInput': [{ type: Output },],
    'singleFilterKeydown': [{ type: Output },],
    'filterInput': [{ type: ViewChild, args: ['filterInput',] },],
    'optionsList': [{ type: ViewChild, args: ['optionsList',] },],
};
//# sourceMappingURL=selectDropdownComponent.js.map