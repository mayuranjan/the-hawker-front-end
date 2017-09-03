import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { TypeService } from "app/the-hawker/InventoryManagement/type/services/type.service";
import { Type } from "app/the-hawker/InventoryManagement/type/models/type";

@Component({
    selector: 'type-list',
    templateUrl: './type-list.template.html',
    styleUrls: ['./type-list.template.css'],
    providers: [TypeService],
    animations: [iconsState]
})
export class TypeListComponent extends BaseComponentList {
    static key = TypeListComponent.name;

    constructor(private _typeService: TypeService) {
        super(new Type(), 'typeId');
    }

    protected listAll(): void {
        this._typeService.list().subscribe(response => {
            if (response.status == 'Success') {
                this.entityList = response.object;
                this.addOptionIconsToEntities(this.entityList);
            }
        });
    }

    protected read(type: Type): void {
        this.mode = new FormMode('view');
        this.selectedEntity = type;
        this.showModal();
    }

    protected update(type: Type): void {
        this.mode = new FormMode('update');
        this.selectedEntity = type;
        this.showModal();
    }

    protected delete(type: Type): void {
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
            this._typeService.delete(type['typeId'].toString()).subscribe(response => {
                switch (response.status) {
                    case 'Success':
                        this.listAll();
                        swal({
                            title: response.status,
                            text: type['typeName'] + " deleted Successfully",
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