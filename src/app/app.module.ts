import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

import { TheHawkerConfig } from 'app/config/TheHawkerConfig';
import { TheHawkerRouter } from 'app/app.routes';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from "@angular/http";
import { BreadcrumbModule } from 'angular2-crumbs';

import { MDBBootstrapModule } from './typescripts/angular-bootstrap-md/free';
import { MDBBootstrapModulePro } from './typescripts/angular-bootstrap-md/pro';
import { AgmCoreModule } from './typescripts/angular-bootstrap-md/free/angular2-google-maps/ts/core/';

import { AppComponent } from 'app/app.component';
import { PageNotFoundComponent } from 'app/page-not-found.component';
import { TheHawkerTemplate } from 'app/the-hawker-template.component';

import { CoreModule } from 'app/the-hawker/CORE/CORE.module';

import { InventoryManagementModule } from 'app/the-hawker/InventoryManagement/InventoryManagement.module';
import { CustomerManagementModule } from 'app/the-hawker/CustomerManagement/CustomerManagement.module';
import { ModuleManagementModule } from 'app/the-hawker/ModuleManagement/ModuleManagement.module';
import { UserManagementModule } from 'app/the-hawker/UserManagement/UserManagement.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    TheHawkerTemplate,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(TheHawkerRouter),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    CoreModule,
    InventoryManagementModule,
    CustomerManagementModule,
    ModuleManagementModule,
    UserManagementModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'google_maps_api_key'
    // })
  ],
  providers: [TheHawkerConfig,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_INITIALIZER, useFactory: (config: TheHawkerConfig) => () => config.load(), deps: [TheHawkerConfig], multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }