import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {Option} from './option';
import {OptionList} from './optionList';

@Component({
    selector: 'select-dropdown',
    template: `
        <div class="dropdown-content" [ngStyle]="{'top.px': top, 'left.px': left, 'width.px': width}">

            <div class="filter"
                *ngIf="!multiple && filterEnabled">
                <input
                    #filterInput
                    autocomplete="on"
                    [placeholder]="placeholder"
                    (click)="onSingleFilterClick($event)"
                    (input)="onSingleFilterInput($event)"
                    (keydown)="onSingleFilterKeydown($event)">
            </div>

            <div class="options"
                #optionsList>
                <ul class="select-dropdown" [ngClass]="{'multiple-select-dropdown': multiple}"
                    (wheel)="onOptionsWheel($event)">
                    <li *ngFor="let option of optionList.filtered"
                        [ngClass]="{'active': option.highlighted, 'selected': option.selected, 'disabled': option.disabled, 'optgroup': option.group}"
                        [ngStyle]="getOptionStyle(option)"
                        (click)="onOptionClick(option)"
                        (mouseover)="onOptionMouseover(option)">
                        <img class="rounded-circle" [src]="option.icon" *ngIf="option.icon !== ''">
                        <span class="select-option" *ngIf="!multiple">{{option.label}}</span>
                        <span class="filtrable" *ngIf="multiple">
                            <input type="checkbox" [checked]="option.selected">
                            <label></label>
                            {{option.label}}
                        </span>
                    </li>
                    <li
                        *ngIf="!optionList.hasShown"
                        class="message disabled">
                        <span>{{notFoundMsg}}</span>
                    </li>
                </ul>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})

export class SelectDropdownComponent
        implements AfterViewInit, OnChanges, OnInit {

    @Input() filterEnabled: boolean;
    @Input() highlightColor: string;
    @Input() highlightTextColor: string;
    @Input() left: number;
    @Input() multiple: boolean;
    @Input() notFoundMsg: string;
    @Input() optionList: OptionList;
    @Input() top: number;
    @Input() width: number;
    @Input() placeholder: string;

    @Output() close = new EventEmitter<boolean>();
    @Output() optionClicked = new EventEmitter<Option>();
    @Output() singleFilterClick = new EventEmitter<null>();
    @Output() singleFilterInput = new EventEmitter<string>();
    @Output() singleFilterKeydown = new EventEmitter<any>();

    @ViewChild('filterInput') filterInput: any;
    @ViewChild('optionsList') optionsList: any;

    disabledColor: string = '#fff';
    disabledTextColor: string = '9e9e9e';

    /** Event handlers. **/

    // Angular life cycle hooks.

    ngOnInit() {
        this.optionsReset();
    }

    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }

    ngAfterViewInit() {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    }

    // Filter input (single select).

    onSingleFilterClick(event: any) {
        this.singleFilterClick.emit(null);
    }

    onSingleFilterInput(event: any) {
        this.singleFilterInput.emit(event.target.value);
    }

    onSingleFilterKeydown(event: any) {
        this.singleFilterKeydown.emit(event);
    }

    // Options list.

    onOptionsWheel(event: any) {
        this.handleOptionsWheel(event);
    }

    onOptionMouseover(option: Option) {
        this.optionList.highlightOption(option);
    }

    onOptionClick(option: Option) {
        this.optionClicked.emit(option);
    }

    /** Initialization. **/

    private optionsReset() {
        this.optionList.filter('');
        this.optionList.highlight();
    }

    /** View. **/

    getOptionStyle(option: Option): any {
        if (option.highlighted) {
            let style: any = {};

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
    }

    clearFilterInput() {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    }

    moveHighlightedIntoView() {

        let list = this.optionsList.nativeElement;
        let listHeight = list.offsetHeight;

        let itemIndex = this.optionList.getHighlightedIndex();

        if (itemIndex > -1) {
            let item = list.children[0].children[itemIndex];
            let itemHeight = item.offsetHeight;

            let itemTop = itemIndex * itemHeight;
            let itemBottom = itemTop + itemHeight;

            let viewTop = list.scrollTop;
            let viewBottom = viewTop + listHeight;

            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    }

    private handleOptionsWheel(e: any) {
        let div = this.optionsList.nativeElement;
        let atTop = div.scrollTop === 0;
        let atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;

        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    }
}