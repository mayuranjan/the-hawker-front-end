import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ImageModal } from './image-popup';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ImageModal],
    exports: [ImageModal]
})
export class LightBoxModule {
}