import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { Address } from 'app/the-hawker/CustomerManagement/address/models/address';
import { BaseComponentAdd } from 'app/the-hawker/CORE/abstracts/base-component-add';
import { AddressService } from 'app/the-hawker/CustomerManagement/address/services/address.service';

@Component({
    selector: 'address-add',
    templateUrl: './address-add.template.html',
    styleUrls: ['./address-add.template.css'],
    providers: [AddressService]
})
export class AddressAddComponent extends BaseComponentAdd {
    static key = AddressAddComponent.name;

    constructor() {
        super(new Address());
    }
}