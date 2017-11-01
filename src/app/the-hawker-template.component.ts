import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TranslateService } from '@ngx-translate/core';

declare var swal: any;

@Component({
    selector: 'the-hawker-template',
    templateUrl: './the-hawker-template.template.html',
})
export class TheHawkerTemplate {

    constructor(private _router: Router, private translate: TranslateService, private _http: Http) {
        translate.addLangs(["English", "Turkey"]);
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/English|Turkey/) ? browserLang : 'English');
        if (Cookie.get('ngTransLanguage') != null && Cookie.get('ngTransLanguage') != '' && Cookie.get('ngTransLanguage') != undefined) {
            this.languageSelect(Cookie.get('ngTransLanguage'));
        }
        else {
            this.languageSelect('English');
        }
    }

    private selectedLanguage = "English";
    private langTranslate: any;

    public getTranslate() {
        if (Cookie.get('ngTransLanguage') === 'Turkey') {
            return this._http
                .get('i18n/Turkey.json')
                .map(res => res.json())
                .catch((error: any): any => {
                    console.log('Configuration file "Turkey.json" could not be read');
                    Observable.throw(error.json().error || 'Server error');
                })
        } else {
            return this._http
                .get('i18n/English.json')
                .map(res => res.json())
                .catch((error: any): any => {
                    console.log('Configuration file "English.json" could not be read');
                    Observable.throw(error.json().error || 'Server error');
                })
        }
    }

    public languageSelect(language) {
        this.selectedLanguage = language;
        this.translate.use(this.selectedLanguage);
        Cookie.set('ngTransLanguage', language);
    }

}
