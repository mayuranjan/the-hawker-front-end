import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { ProductService } from "app/the-hawker/InventoryManagement/product/services/product.service";
import { Product } from "app/the-hawker/InventoryManagement/product/models/product";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.template.html',
    styleUrls: ['./product-list.template.css'],
    providers: [ProductService],
    animations: [iconsState]
})
export class ProductListComponent extends BaseComponentList {
    static key = ProductListComponent.name;

    constructor(private _productService: ProductService) {
        super(new Product(), 'productId');
    }

    protected listAll(): void {
        this._productService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.entityList = response.object;
                this.addOptionIconsToEntities(this.entityList);
                this.addObjectNameToEntities(this.entityList, new Product());
            }
        });
    }

    protected read(product: Product): void {
        this.mode = new FormMode('view');
        this.selectedEntity = product;
        this.showModal();
    }

    protected update(product: Product): void {
        this.mode = new FormMode('update');
        this.selectedEntity = product;
        this.showModal();
    }

    protected delete(product: Product): void {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(() => {
            this._productService.delete(product['productId'].toString()).subscribe(response => {
                switch (response.status) {
                    case 'Success':
                        this.listAll();
                        swal({
                            title: response.status,
                            text: product['productName'] + " deleted Successfully",
                            type: 'success',
                            showCancelButton: true,
                            confirmButtonColor: "#ffb606",
                            confirmButtonText: "OK"
                        });
                        break;
                    case 'Failure':
                        swal({
                            title: "Delete " + this.entity['name'],
                            text: response.message,
                            type: 'error',
                            showCancelButton: true,
                            confirmButtonColor: "#ffb606",
                            confirmButtonText: "OK"
                        });
                        break;

                    default:
                        break;
                }
            }, error => {
                swal({
                    title: error.status,
                    text: error.reason,
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonColor: "#ffb606",
                    confirmButtonText: "OK"
                });
            });
        }, (dismiss) => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your ' + this.entity['name'] + ' is safe.',
                    'info'
                )
            }
        })

    }
}