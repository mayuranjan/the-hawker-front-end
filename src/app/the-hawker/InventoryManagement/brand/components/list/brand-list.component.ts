import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { element } from 'protractor';
import { Brand } from './../../models/brand';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";

@Component({
    selector: 'brand-list',
    templateUrl: './brand-list.template.html',
    styleUrls: ['./brand-list.template.css'],
    providers: [BrandService],
    animations: [iconsState]
})
export class BrandListComponent extends BaseComponentList {
    static key = BrandListComponent.name;

    constructor(private _brandService: BrandService) {
        super(new Brand(), 'brandId');
    }

    protected listAll(): void {
        this._brandService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.entityList = response.object;
                this.addOptionIconsToEntities(this.entityList);
            }
        });
    }

    protected read(brand: Brand): void {
        this.mode = new FormMode('view');
        this.selectedEntity = brand;
        this.showModal();
    }

    protected update(brand: Brand): void {
        this.mode = new FormMode('update');
        this.selectedEntity = brand;
        this.showModal();
    }

    protected delete(brand: Brand): void {
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
            this._brandService.delete(brand.brandId.toString()).subscribe(response => {
                switch (response.status) {
                    case 'Success':
                        this.listAll();
                        swal({
                            title: response.status,
                            text: brand.brandName + " deleted Successfully",
                            type: 'success',
                            showCancelButton: true,
                            confirmButtonColor: "#ffb606",
                            confirmButtonText: "OK"
                        });
                        break;
                    case 'Failure':
                        swal({
                            title: "Delete Brand",
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
                    'Your Brand is safe.',
                    'info'
                )
            }
        })

    }
}