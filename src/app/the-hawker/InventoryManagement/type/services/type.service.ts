import { TheHawkerConfig } from 'app/config/TheHawkerConfig';
import { Injectable } from "@angular/core";
import { Http, Headers, Request, RequestOptions, RequestMethod } from "@angular/http";

import { Observable } from "rxjs/Rx";

import { BaseCRUDServices } from "app/the-hawker/CORE/abstracts/base-crud-service";

@Injectable()
export class TypeService extends BaseCRUDServices {
    constructor(public _http: Http, public _config: TheHawkerConfig) {
        super(_http, _config, "INVENTORY-MANAGEMENT", "TYPE");
    }
}