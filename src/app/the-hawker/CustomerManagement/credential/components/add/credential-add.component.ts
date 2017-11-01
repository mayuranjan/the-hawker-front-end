import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, state } from '@angular/core';
import swal from 'sweetalert2';
import { Credential } from 'app/the-hawker/CustomerManagement/credential/models/credential';
import { BaseComponentAdd } from 'app/the-hawker/CORE/abstracts/base-component-add';
import { CredentialService } from 'app/the-hawker/CustomerManagement/credential/services/credential.service';

@Component({
    selector: 'credential-add',
    templateUrl: './credential-add.template.html',
    styleUrls: ['./credential-add.template.css'],
    providers: [CredentialService]
})
export class CredentialAddComponent extends BaseComponentAdd {
    static key = CredentialAddComponent.name;

    constructor() {
        super(new Credential());
    }
}