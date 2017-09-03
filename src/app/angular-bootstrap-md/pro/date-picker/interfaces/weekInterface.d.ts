import { IMyCalendarDay } from "./calendarDayInterface";
export interface IMyWeek {
    week: Array<IMyCalendarDay>;
    weekNbr: number;
}
