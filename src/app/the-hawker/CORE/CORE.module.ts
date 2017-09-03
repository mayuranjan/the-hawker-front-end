import { NgModule } from '@angular/core'

import { DndModule } from 'ng2-dnd';
import { HttpModule, Http } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    exports: [
    ],
    entryComponents: [
    ]


})
export class CoreModule {

}
