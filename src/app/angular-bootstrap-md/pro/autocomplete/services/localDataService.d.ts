import { Observable } from "rxjs/Observable";
import { CompleterBaseData } from "./baseDataService";
import { CompleterItem } from "../components/completerItemComponent";
export declare class LocalData extends CompleterBaseData {
    private _data;
    private savedTerm;
    constructor();
    data(data: any[] | Observable<any[]>): this;
    search(term: string): void;
    convertToItem(data: any): CompleterItem;
}
