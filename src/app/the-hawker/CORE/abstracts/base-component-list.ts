import { Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { FormMode } from './../models/formMode';

export abstract class BaseComponentList {

    @ViewChild('formModal') public formModal: ModalDirective;

    protected entityList: Object[];
    protected mode: FormMode;
    protected selectedEntity:Object = this.entity;
    protected isModalVisible: boolean = false;

    constructor(protected entity: Object, private idField: string) {  }

    ngOnInit() {
        this.listAll();
    }

    protected toggleIcons(entity: Object): void {
        // resetting all the option icons for other entities
        this.addOptionIconsToEntities(this.entityList.filter(object => object[this.idField] != entity[this.idField]));
        entity['optionIcon'] = (entity['optionIcon'] == 'isactive') ? 'isnotactive' : 'isactive';
    }

    protected addOptionIconsToEntities(entityList: Object[]): void {
        entityList.forEach(element => {
            element['optionIcon'] = 'inactive';
        });
    }

    protected collapseAllIcons(): void {
        // resetting all the option icons for other entities
        this.addOptionIconsToEntities(this.entityList);
    }

    protected showModal(): void {
        this.isModalVisible = true;
    }

    protected hideModal(): void {
        this.formModal.hide();
    }

    protected onHidden(): void {
        this.isModalVisible = false;
    }

    protected abstract listAll(): void;
    protected abstract read(object: Object): void;
    protected abstract update(object: Object): void;
    protected abstract delete(object: Object): void;

    protected refresh(): void {
        window.location.reload();
    }
}