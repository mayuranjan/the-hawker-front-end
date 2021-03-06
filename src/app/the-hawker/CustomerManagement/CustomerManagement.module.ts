import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { TheHawkerRouter } from "app/app.routes";

import { MDBBootstrapModule } from 'app/typescripts/angular-bootstrap-md/free';
import { MDBBootstrapModulePro } from 'app/typescripts/angular-bootstrap-md/pro';

import { HttpModule, Http } from "@angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule } from '../CORE/CORE.module';

import { AddressListComponent } from './address/components/list/address-list.component';
import { AddressAddComponent } from './address/components/add/address-add.component';
import { AddressFormComponent } from './address/components/form/address-form.component';
import { CredentialFormComponent } from 'app/the-hawker/CustomerManagement/credential/components/form/credential-form.component';
import { CredentialAddComponent } from 'app/the-hawker/CustomerManagement/credential/components/add/CREDENTIAL-add.component';
import { CredentialListComponent } from 'app/the-hawker/CustomerManagement/credential/components/list/credential-list.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
    declarations: [
        AddressListComponent,
        AddressAddComponent,
        AddressFormComponent,
        CredentialListComponent,
        CredentialAddComponent,
        CredentialFormComponent
    ],
    imports: [
        CoreModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        MDBBootstrapModule.forRoot(),
        MDBBootstrapModulePro.forRoot(),
        RouterModule.forRoot(TheHawkerRouter),
        DndModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })

    ],
    schemas: [NO_ERRORS_SCHEMA],
    exports: [
        AddressListComponent,
        AddressAddComponent,
        AddressFormComponent,
        CredentialListComponent,
        CredentialAddComponent,
        CredentialFormComponent
    ],
    providers: [],
    entryComponents: [
        AddressListComponent,
        AddressAddComponent,
        AddressFormComponent,
        CredentialListComponent,
        CredentialAddComponent,
        CredentialFormComponent
    ],
})
export class CustomerManagementModule { }