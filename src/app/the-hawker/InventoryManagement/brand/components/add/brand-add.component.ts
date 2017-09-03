import { BaseComponentAdd } from './../../../../CORE/abstracts/base-component-add';
import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from "../../models/brand";
import swal from 'sweetalert2';

@Component({
    selector: 'brand-add',
    templateUrl: './brand-add.template.html',
    styleUrls: ['./brand-add.template.css'],
    providers: [BrandService]
})
export class BrandAddComponent extends BaseComponentAdd {
    static key = BrandAddComponent.name;

    constructor() {
        super(new Brand());
    }
}