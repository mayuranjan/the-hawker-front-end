import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { element } from 'protractor';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { AddressService } from 'app/the-hawker/CustomerManagement/address/services/address.service';
import { Address } from 'app/the-hawker/CustomerManagement/address/models/address';

@Component({
    selector: 'address-list',
    templateUrl: './address-list.template.html',
    styleUrls: ['./address-list.template.css'],
    providers: [AddressService],
    animations: [iconsState]
})
export class AddressListComponent extends BaseComponentList {
    static key = AddressListComponent.name;

    constructor(private _addressService: AddressService) {
        super(new Address(), 'addressId');
    }

    protected listAll(): void {
        this._addressService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.entityList = response.object;
                this.addOptionIconsToEntities(this.entityList);
            }
        });
    }

    protected read(address: Address): void {
        this.mode = new FormMode('view');
        this.selectedEntity = address;
        this.showModal();
    }

    protected update(address: Address): void {
        this.mode = new FormMode('update');
        this.selectedEntity = address;
        this.showModal();
    }

    protected delete(address: Address): void {
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
            this._addressService.delete(address.addressId.toString()).subscribe(response => {
                switch (response.status) {
                    case 'Success':
                        this.listAll();
                        swal({
                            title: response.status,
                            text: "Address deleted Successfully",
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
                    'Your Address is safe.',
                    'info'
                )
            }
        })

    }
}