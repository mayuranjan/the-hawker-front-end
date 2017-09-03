import { Input, Output, EventEmitter } from '@angular/core';
import { FormMode } from './../models/formMode';
import { SimpleObjectComparision } from "app/the-hawker/CORE/util/SimpleObjectComparision";

export abstract class BaseComponentForm {

    @Input() protected entity: Object = this.entityObject;
    @Input() protected mode: FormMode = new FormMode('');

    @Output() protected onUpsertSuccess = new EventEmitter();

    protected entityToCompare: Object;

    constructor(private entityObject: Object) { }

    ngOnInit() {
        this.entityToCompare = JSON.parse(JSON.stringify(this.entity));
    }

    protected onSubmit(): void {
        if (this.mode.add) {
            this.create();
        }
        if (this.mode.update) {
            this.update();
        }
        if (this.mode.view) {
            // no operation
        }
    }

    protected abstract create(): void;
    protected abstract update(): void;

    protected refresh(): void {
        window.location.reload();
    }
}