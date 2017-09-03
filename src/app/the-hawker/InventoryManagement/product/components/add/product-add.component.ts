import { BaseComponentAdd } from './../../../../CORE/abstracts/base-component-add';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { ProductService } from "app/the-hawker/InventoryManagement/product/services/product.service";
import { Product } from "app/the-hawker/InventoryManagement/product/models/product";

@Component({
    selector: 'product-add',
    templateUrl: './product-add.template.html',
    styleUrls: ['./product-add.template.css'],
    providers: [ProductService]
})
export class ProductAddComponent extends BaseComponentAdd {
    static key = ProductAddComponent.name;

    constructor() {
        super(new Product());
    }
}