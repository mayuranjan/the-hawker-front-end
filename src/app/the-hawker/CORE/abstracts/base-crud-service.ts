import { IPayload } from './../interfaces/i-payload';
import { Observable } from 'rxjs/Rx';
import { BaseUrl } from "app/the-hawker/CORE/abstracts/base-url";
import { Http, Headers, Request, RequestOptions, RequestMethod } from "@angular/http";
import { TheHawkerConfig } from "app/config/TheHawkerConfig";

export abstract class BaseCRUDServices extends BaseUrl implements IPayload {
    url: string;
    headers: Headers;
    requestOptions: RequestOptions;

    constructor(public _http: Http, public _config: TheHawkerConfig, protected _moduleName: string, protected _entityName: string) {
        super(_http, _config, _moduleName, _entityName);
    }

    public create(object: Object) {
        this.url = this.createUrl();

        this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        this.requestOptions = new RequestOptions({ headers: this.headers }); // Create a request option

        return this._http.post(this.url, object, this.requestOptions)
            .map(res => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
    }
    
    public list() {
        this.url = this.listUrl();

        return this._http.get(this.url)
            .map(res => res.json())
            .catch(error => error.json())

    }

    public update(id: string, object: object) {
        this.url = this.updateUrl();

        this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        this.requestOptions = new RequestOptions({ headers: this.headers }); // Create a request option

        return this._http
            .put(this.url + "/" + id, object, this.requestOptions)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    public delete(id: string) {
        this.url = this.deleteUrl();

        return this._http
            .delete(this.url + "/" + id)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}