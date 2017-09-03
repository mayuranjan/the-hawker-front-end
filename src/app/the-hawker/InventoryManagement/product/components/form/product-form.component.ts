import { BaseComponentForm } from './../../../../CORE/abstracts/base-component-form';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { ProductService } from "app/the-hawker/InventoryManagement/product/services/product.service";
import { Product } from "app/the-hawker/InventoryManagement/product/models/product";
import { SimpleObjectComparision } from "app/the-hawker/CORE/util/SimpleObjectComparision";
import { Brand } from "app/the-hawker/InventoryManagement/brand/models/brand";
import { BrandService } from "app/the-hawker/InventoryManagement/brand/services/brand.service";
import { TypeService } from "app/the-hawker/InventoryManagement/type/services/type.service";
import { Type } from "app/the-hawker/InventoryManagement/type/models/type";

@Component({
    selector: 'product-form',
    templateUrl: './product-form.template.html',
    styleUrls: ['./product-form.template.css'],
    providers: [ProductService, BrandService, TypeService]
})
export class ProductFormComponent extends BaseComponentForm implements OnInit {
    static key = ProductFormComponent.name;

    private brandList: Brand[];
    private typeList: Type[];

    private brandDropdownHeader: string = "Choose Brand";
    private typeDropdownHeader: string = "Choose Type";

    constructor(private _productService: ProductService, private _brandService: BrandService, private _typeService: TypeService) {
        super(new Product());
    }

    ngOnInit() {
        this.entityToCompare = JSON.parse(JSON.stringify(this.entity));
        this.listAllBrands();
        this.listAllTypes();
    }

    protected listAllBrands(): void {
        this._brandService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.brandList = response.object;
            }
        });
    }

    private setBrand(brand: Brand): void {
        this.entity['brandId'] = brand.brandId;
        this.brandDropdownHeader = brand.brandName;
    }

    protected listAllTypes(): void {
        this._typeService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.typeList = response.object;
            }
        });
    }

    private setType(type: Type): void {
        this.entity['typeId'] = type.typeId;
        this.typeDropdownHeader = type.typeName;
    }

    protected create(): void {
        this._productService.create(this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: this.entity['productName'] + " added Successfully",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK",
                        timer: 10000
                    }).then((onfulfilled) => {
                        swal({
                            title: 'Open ' + this.entity['name'] + ' Details?',
                            text: 'Would you like to Open details.',
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: "#ffb606",
                            confirmButtonText: "OK",
                        }).then((onfulfilled) => {
                            // Open Description Page
                        }, (dismiss) => {
                            // dismiss can be 'cancel', 'overlay',
                            // 'close', and 'timer'
                            if (dismiss === 'cancel') {
                                this.refresh();
                            }
                        });
                    }, (dismiss) => {
                        // dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                        this.refresh();
                    });
                    this.onUpsertSuccess.emit();
                    break;
                case 'Failure':
                    swal({
                        title: "Add " + this.entity['name'],
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
    }

    protected update(): void {

        if (SimpleObjectComparision.compareObject(this.entity, this.entityToCompare)) {
            swal({
                title: "No Update Required",
                text: "No changes found for " + this.entity['productName'],
                type: 'info',
                showCancelButton: false,
                confirmButtonColor: "#ffb606",
                confirmButtonText: "OK"
            });
            return;
        }

        this._productService.update(this.entity['productId'].toString(), this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: this.entity['productName'] + " updated Successfully",
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK"
                    });
                    this.onUpsertSuccess.emit();
                    break;
                case 'Failure':
                    swal({
                        title: "Uppdate " + this.entity['name'],
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
    }
}