import { IURL } from './../interfaces/i-url';
import { TheHawkerConfig } from 'app/config/TheHawkerConfig';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

export abstract class BaseUrl implements IURL {
    _moduleCanonicalURL = "THE-HAWKER." + this._moduleName;
    _entityCanonicalURL = this._entityName + ".BASE";
    _createCanonicalURL = this._entityName + ".CREATE";
    _listCanonicalURL = this._entityName + ".LIST";
    _readCanonicalURL = this._entityName + ".READ-BY-ID";
    _updateCanonicalURL = this._entityName + ".UPDATE-BY-ID";
    _deleteCanonicalURL = this._entityName + ".DELETE-BY-ID";

    protected urlProperties = {};

    constructor(public _http: Http, public _config: TheHawkerConfig, protected _moduleName: string, protected _entityName: string) { }

    protected apiBaseUrl() {
        return this._config.readCanonicalURLProperties("IP") + this._config.readCanonicalURLProperties("PORT") + this._config.readCanonicalURLProperties("THE-HAWKER.BASE");
    }

    protected moduleUrl(): string {
        return this.apiBaseUrl() + this._config.readCanonicalURLProperties(this._moduleCanonicalURL);
    }

    protected entityUrl(): string {
        return this.moduleUrl() + this._config.readCanonicalURLProperties(this._entityCanonicalURL);
    }

    protected createUrl(): string {
        return this.entityUrl() + this._config.readCanonicalURLProperties(this._createCanonicalURL);
    }

    protected listUrl(): string {
        return this.entityUrl() + this._config.readCanonicalURLProperties(this._listCanonicalURL);
    }

    protected readUrl(): string {
        return this.entityUrl() + this._config.readCanonicalURLProperties(this._readCanonicalURL);
    }

    protected updateUrl(): string {
        return this.entityUrl() + this._config.readCanonicalURLProperties(this._updateCanonicalURL);
    }

    protected deleteUrl(): string {
        return this.entityUrl() + this._config.readCanonicalURLProperties(this._deleteCanonicalURL);
    }

}