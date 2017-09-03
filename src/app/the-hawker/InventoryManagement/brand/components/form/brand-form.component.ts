import { BaseComponentForm } from './../../../../CORE/abstracts/base-component-form';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from "../../models/brand";
import swal from 'sweetalert2';
import { SimpleObjectComparision } from "app/the-hawker/CORE/util/SimpleObjectComparision";

@Component({
    selector: 'brand-form',
    templateUrl: './brand-form.template.html',
    styleUrls: ['./brand-form.template.css'],
    providers: [BrandService]
})
export class BrandFormComponent extends BaseComponentForm implements OnInit {
    static key = BrandFormComponent.name;

    constructor(private _brandService: BrandService) {
        super(new Brand());
    }

    protected create(): void {
        this._brandService.create(this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: this.entity['brandName'] + " added Successfully",
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
                        title: "Add Brand",
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
                text: "No changes found for " + this.entity['brandName'],
                type: 'info',
                showCancelButton: false,
                confirmButtonColor: "#ffb606",
                confirmButtonText: "OK"
            });
            return;
        }

        this._brandService.update(this.entity['brandId'].toString(), this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: this.entity['brandName'] + " updated Successfully",
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK"
                    });
                    this.onUpsertSuccess.emit();
                    break;
                case 'Failure':
                    swal({
                        title: "Uppdate Brand",
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