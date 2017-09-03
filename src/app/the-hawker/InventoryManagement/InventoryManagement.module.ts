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

import { BrandListComponent } from './brand/components/list/brand-list.component';
import { BrandAddComponent } from './brand/components/add/brand-add.component';
import { BrandFormComponent } from './brand/components/form/brand-form.component';

import { TypeListComponent } from './type/components/list/type-list.component';
import { TypeAddComponent } from './type/components/add/type-add.component';
import { TypeFormComponent } from './type/components/form/type-form.component';

import { ProductListComponent } from './product/components/list/product-list.component';
import { ProductAddComponent } from './product/components/add/product-add.component';
import { ProductFormComponent } from './product/components/form/product-form.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
    declarations: [
        BrandListComponent,
        BrandAddComponent,
        BrandFormComponent,
        TypeListComponent,
        TypeAddComponent,
        TypeFormComponent,
        ProductListComponent,
        ProductAddComponent,
        ProductFormComponent
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
        BrandListComponent,
        BrandAddComponent,
        BrandFormComponent,
        TypeListComponent,
        TypeAddComponent,
        TypeFormComponent,
        ProductListComponent,
        ProductAddComponent,
        ProductFormComponent
    ],
    providers: [],
    entryComponents: [
        BrandListComponent,
        BrandAddComponent,
        BrandFormComponent,
        TypeListComponent,
        TypeAddComponent,
        TypeFormComponent,
        ProductListComponent,
        ProductAddComponent,
        ProductFormComponent
    ],
})
export class InventoryManagementModule { }