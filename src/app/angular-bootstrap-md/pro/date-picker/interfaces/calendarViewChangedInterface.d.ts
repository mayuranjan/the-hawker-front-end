import { IMyWeekday } from "./weekdayInterface";
export interface IMyCalendarViewChanged {
    year: number;
    month: number;
    first: IMyWeekday;
    last: IMyWeekday;
}
