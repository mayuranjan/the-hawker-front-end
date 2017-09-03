import { Type } from './../../models/type';
import { TypeService } from './../../services/type.service';
import { BaseComponentForm } from './../../../../CORE/abstracts/base-component-form';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { SimpleObjectComparision } from "app/the-hawker/CORE/util/SimpleObjectComparision";

@Component({
    selector: 'type-form',
    templateUrl: './type-form.template.html',
    styleUrls: ['./type-form.template.css'],
    providers: [TypeService]
})
export class TypeFormComponent extends BaseComponentForm implements OnInit {
    static key = TypeFormComponent.name;

    constructor(private _typeService: TypeService) {
        super(new Type());
    }

    protected create(): void {
        this._typeService.create(this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: this.entity['typeName'] + " added Successfully",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#ffb606",
                        confirmButtonText: "OK",
                        timer: 10000
                    }).then((onfulfilled) => {
                        swal({
                            title: 'Open '+ this.entity['name'] +' Details?',
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
                text: "No changes found for " + this.entity['typeName'],
                type: 'info',
                showCancelButton: false,
                confirmButtonColor: "#ffb606",
                confirmButtonText: "OK"
            });
            return;
        }

        this._typeService.update(this.entity['typeId'].toString(), this.entity).subscribe(response => {
            switch (response.status) {
                case 'Success':
                    swal({
                        title: response.status,
                        text: this.entity['typeName'] + " updated Successfully",
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