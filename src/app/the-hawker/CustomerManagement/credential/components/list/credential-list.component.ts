import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { element } from 'protractor';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { CredentialService } from 'app/the-hawker/CustomerManagement/credential/services/credential.service';
import { Credential } from 'app/the-hawker/CustomerManagement/credential/models/credential';

@Component({
    selector: 'credential-list',
    templateUrl: './credential-list.template.html',
    styleUrls: ['./credential-list.template.css'],
    providers: [CredentialService],
    animations: [iconsState]
})
export class CredentialListComponent extends BaseComponentList {
    static key = CredentialListComponent.name;

    constructor(private _credentialService: CredentialService) {
        super(new Credential(), 'credentialId');
    }

    protected listAll(): void {
        this._credentialService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.entityList = response.object;
                this.addOptionIconsToEntities(this.entityList);
                this.addObjectNameToEntities(this.entityList, new Credential());
            }
        });
    }

    protected read(credential: Credential): void {
        this.mode = new FormMode('view');
        this.selectedEntity = credential;
        this.showModal();
    }

    protected update(credential: Credential): void {
        this.mode = new FormMode('update');
        this.selectedEntity = credential;
        this.showModal();
    }

    protected delete(credential: Credential): void {
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
            this._credentialService.delete(credential.credentialId.toString()).subscribe(response => {
                switch (response.status) {
                    case 'Success':
                        this.listAll();
                        swal({
                            title: response.status,
                            text: "Credential deleted Successfully",
                            type: 'success',
                            showCancelButton: true,
                            confirmButtonColor: "#ffb606",
                            confirmButtonText: "OK"
                        });
                        break;
                    case 'Failure':
                        swal({
                            title: "Delete Credential",
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
                    'Your Credential is safe.',
                    'info'
                )
            }
        })

    }
}