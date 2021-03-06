import { EventEmitter, OnChanges, SimpleChanges, ElementRef, ChangeDetectorRef, Renderer } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { IMyDate, IMyMonth, IMyWeek, IMyDateModel, IMyInputAutoFill, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur } from "./interfaces/index";
import { LocaleService } from "./services/datepickerLocaleService";
import { UtilService } from "./services/datepickerUtilService";
export declare const MYDP_VALUE_ACCESSOR: any;
export declare class MyDatePicker implements OnChanges, ControlValueAccessor {
    elem: ElementRef;
    private renderer;
    private cdr;
    private localeService;
    private utilService;
    options: any;
    locale: string;
    defaultMonth: string;
    selDate: string;
    placeholder: string;
    selector: number;
    disabled: boolean;
    dateChanged: EventEmitter<IMyDateModel>;
    inputFieldChanged: EventEmitter<IMyInputFieldChanged>;
    calendarViewChanged: EventEmitter<IMyCalendarViewChanged>;
    calendarToggle: EventEmitter<number>;
    inputFocusBlur: EventEmitter<IMyInputFocusBlur>;
    divFocus: any;
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    showSelector: boolean;
    visibleMonth: IMyMonth;
    selectedMonth: IMyMonth;
    selectedDate: IMyDate;
    weekDays: Array<string>;
    dates: Array<IMyWeek>;
    selectionDayTxt: string;
    invalidDate: boolean;
    disableTodayBtn: boolean;
    dayIdx: number;
    weekDayOpts: Array<string>;
    autoFillOpts: IMyInputAutoFill;
    editMonth: boolean;
    invalidMonth: boolean;
    editYear: boolean;
    invalidYear: boolean;
    prevMonthDisabled: boolean;
    nextMonthDisabled: boolean;
    prevYearDisabled: boolean;
    nextYearDisabled: boolean;
    prevMonthId: number;
    currMonthId: number;
    nextMonthId: number;
    tmp: IMyDate;
    opts: any;
    months: any;
    years: any;
    constructor(elem: ElementRef, renderer: Renderer, cdr: ChangeDetectorRef, localeService: LocaleService, utilService: UtilService);
    removeInlineStyle(): void;
    setLocaleOptions(): void;
    setOptions(): void;
    getSelectorTopPosition(): string;
    resetMonthYearEdit(): void;
    editMonthClicked(event: any): void;
    editYearClicked(event: any): void;
    onUserDateInput(value: string): void;
    onFocusInput(event: any): void;
    onBlurInput(event: any): void;
    onUserMonthInput(value: string): void;
    onUserYearInput(value: string): void;
    isTodayDisabled(): void;
    parseOptions(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    removeBtnClicked(): void;
    openBtnClicked(): void;
    setVisibleMonth(): void;
    monthList(): void;
    yearsList(): void;
    prevMonth(): void;
    nextMonth(): void;
    prevYear(): void;
    nextYear(): void;
    todayClicked(): void;
    cellClicked(cell: any): void;
    cellKeyDown(event: any, cell: any): void;
    clearDate(): void;
    selectDate(date: IMyDate): void;
    updateDateValue(date: IMyDate, clear: boolean): void;
    getDateModel(date: IMyDate): IMyDateModel;
    preZero(val: string): string;
    formatDate(val: any): string;
    monthText(m: number): string;
    weekText(m: string): string;
    monthStartIdx(y: number, m: number): number;
    daysInMonth(m: number, y: number): number;
    daysInPrevMonth(m: number, y: number): number;
    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean;
    getToday(): IMyDate;
    getTimeInMilliseconds(date: IMyDate): number;
    getWeekday(date: IMyDate): string;
    getDate(year: number, month: number, day: number): Date;
    sundayIdx(): number;
    generateCalendar(m: number, y: number, notifyChange: boolean): void;
    parseSelectedDate(selDate: any): IMyDate;
    parseSelectedMonth(ms: string): IMyMonth;
    setHeaderBtnDisabledState(m: number, y: number): void;
}
