import { BaseComponentForm } from './../../../../CORE/abstracts/base-component-form';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { SimpleObjectComparision } from "app/the-hawker/CORE/util/SimpleObjectComparision";
import { CredentialService } from 'app/the-hawker/CustomerManagement/credential/services/credential.service';
import { Credential } from 'app/the-hawker/CustomerManagement/credential/models/credential';

@Component({
    selector: 'credential-form',
    templateUrl: './credential-form.template.html',
    styleUrls: ['./credential-form.template.css'],
    providers: [CredentialService]
})
export class CredentialFormComponent extends BaseComponentForm implements OnInit {
    static key = CredentialFormComponent.name;

    constructor(private _credentialService: CredentialService) {
        super(new Credential());
    }

    protected create(): void {
        this._credentialService.create(this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: "Credential added Successfully",
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
                        title: "Add Credential",
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
                text: "No changes found for Credential",
                type: 'info',
                showCancelButton: false,
                confirmButtonColor: "#ffb606",
                confirmButtonText: "OK"
            });
            return;
        }

        this._credentialService.update(this.entity['credentialId'].toString(), this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: "Credential updated Successfully",
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK"
                    });
                    this.onUpsertSuccess.emit();
                    break;
                case 'Failure':
                    swal({
                        title: "Update Credential",
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