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
import { ModuleListComponent } from 'app/the-hawker/ModuleManagement/module/components/list/module-list.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
    declarations: [
        ModuleListComponent
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
        ModuleListComponent
    ],
    providers: [],
    entryComponents: [
        ModuleListComponent
    ],
})
export class ModuleManagementModule { }