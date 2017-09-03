import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { CompleterBaseData } from "./baseDataService";
import { CompleterItem } from "../components/completerItemComponent";
export declare class RemoteData extends CompleterBaseData {
    private http;
    private _remoteUrl;
    private remoteSearch;
    private _urlFormater;
    private _dataField;
    private _headers;
    private _requestOptions;
    constructor(http: Http);
    remoteUrl(remoteUrl: string): this;
    urlFormater(urlFormater: (term: string) => string): void;
    dataField(dataField: string): void;
    headers(headers: Headers): void;
    requestOptions(requestOptions: RequestOptions): void;
    search(term: string): void;
    cancel(): void;
    convertToItem(data: any): CompleterItem;
}
