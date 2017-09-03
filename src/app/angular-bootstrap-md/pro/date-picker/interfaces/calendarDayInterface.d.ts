import { IMyDate } from "./dateInterface";
import { IMyMarkedDate } from "./markedDateInterface";
export interface IMyCalendarDay {
    dateObj: IMyDate;
    cmo: number;
    currDay: boolean;
    dayNbr: number;
    disabled: boolean;
    markedDate: IMyMarkedDate;
}
