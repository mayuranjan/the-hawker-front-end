import { IMyDate } from "./dateInterface";

export interface IMyDateModel {
    date: IMyDate;
    jsdate: Date;
    formatted: string;
    epoc: number;
}