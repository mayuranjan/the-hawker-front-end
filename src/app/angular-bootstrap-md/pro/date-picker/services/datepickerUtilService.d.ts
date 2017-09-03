import { IMyDate } from "../interfaces/dateInterface";
import { IMyDateRange } from "../interfaces/dateRangeInterface";
import { IMyMonth } from "../interfaces/monthInterface";
import { IMyMonthLabels } from "../interfaces/monthLabelsInterface";
import { IMyMarkedDates } from "../interfaces/markedDatesInterface";
import { IMyMarkedDate } from "../interfaces/markedDateInterface";
export declare class UtilService {
    isDateValid(dateStr: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRanges: Array<IMyDateRange>, monthLabels: IMyMonthLabels, enableDays: Array<IMyDate>): IMyDate;
    getDateFormatSeparator(dateFormat: string): string;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number;
    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number;
    getDatePartIndex(dateFormat: string, datePart: string): number;
    parseDefaultMonth(monthString: string): IMyMonth;
    isDisabledDay(date: IMyDate, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRanges: Array<IMyDateRange>, enableDays: Array<IMyDate>): boolean;
    isMarkedDate(date: IMyDate, markedDates: Array<IMyMarkedDates>, markWeekends: IMyMarkedDate): IMyMarkedDate;
    getWeekNumber(date: IMyDate): number;
    isMonthDisabledByDisableUntil(date: IMyDate, disableUntil: IMyDate): boolean;
    isMonthDisabledByDisableSince(date: IMyDate, disableSince: IMyDate): boolean;
    isInitializedDate(date: IMyDate): boolean;
    getTimeInMilliseconds(date: IMyDate): number;
    getDayNumber(date: IMyDate): number;
}
