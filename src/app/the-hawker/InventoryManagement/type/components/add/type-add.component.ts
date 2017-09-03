import { TypeService } from './../../services/type.service';
import { BaseComponentAdd } from './../../../../CORE/abstracts/base-component-add';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { Type } from "app/the-hawker/InventoryManagement/type/models/type";

@Component({
    selector: 'type-add',
    templateUrl: './type-add.template.html',
    styleUrls: ['./type-add.template.css'],
    providers: [TypeService]
})
export class TypeAddComponent extends BaseComponentAdd {
    static key = TypeAddComponent.name;

    constructor() {
        super(new Type());
    }
}