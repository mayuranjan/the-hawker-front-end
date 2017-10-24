import { BaseComponentForm } from './../../../../CORE/abstracts/base-component-form';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { SimpleObjectComparision } from "app/the-hawker/CORE/util/SimpleObjectComparision";
import { AddressService } from 'app/the-hawker/CustomerManagement/address/services/address.service';
import { Address } from 'app/the-hawker/CustomerManagement/address/models/address';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.template.html',
    styleUrls: ['./address-form.template.css'],
    providers: [AddressService]
})
export class AddressFormComponent extends BaseComponentForm implements OnInit {
    static key = AddressFormComponent.name;

    constructor(private _brandService: AddressService) {
        super(new Address());
    }

    protected create(): void {
        this._brandService.create(this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: "Address added Successfully",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK",
                        timer: 10000
                    }).then((onfulfilled) => {
                        swal({
                            title: 'Open Brand Details?',
                            text: 'Would you like to Open details.',
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: "#ffb606",
                            confirmButtonText: "OK",
                        }).then((onfulfilled) => {
                            // Open Brand Description Page
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
                        title: "Add Address",
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
                text: "No changes found for Address",
                type: 'info',
                showCancelButton: false,
                confirmButtonColor: "#ffb606",
                confirmButtonText: "OK"
            });
            return;
        }

        this._brandService.update(this.entity['addressId'].toString(), this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: "Address updated Successfully",
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK"
                    });
                    this.onUpsertSuccess.emit();
                    break;
                case 'Failure':
                    swal({
                        title: "Update Address",
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