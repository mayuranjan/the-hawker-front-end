import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { element } from 'protractor';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { Module } from 'app/the-hawker/ModuleManagement/module/models/module';
import { SubModuleService } from 'app/the-hawker/ModuleManagement/sub-module/services/subModule.service';
import { SubModule } from 'app/the-hawker/ModuleManagement/sub-module/models/subModule';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sub-module-list',
    templateUrl: './sub-module-list.template.html',
    styleUrls: ['./sub-module-list.template.css'],
    providers: [SubModuleService]
})
export class SubModuleListComponent {
    static key = SubModuleListComponent.name;

    private subModule: SubModule;
    private idField: string
    private entityList: SubModule[];
    private selectedEntity: Object = this.subModule;

    constructor(private _subModuleService: SubModuleService, private _router: Router, public _activatedRoute: ActivatedRoute) {
        this.subModule = new SubModule();
        this.idField = 'subModuleId';
        this._activatedRoute.params.subscribe(params => {
            this.listAllByModule(params.moduleId);
        });
    }

    private listAllByModule(moduleId: number): void {
        this.entityList = new Array<SubModule>();

        // Brand SubModule
        var brandSubModule = new SubModule();
        brandSubModule.title = "Brand";
        brandSubModule.id = "THI-B";
        brandSubModule.orderNumber = 2;
        brandSubModule.imagePath = "./img/sub-module/brand.jpg";
        brandSubModule.icon = "fa fa-briefcase";
        brandSubModule.header = "Header";
        brandSubModule.description = "Description";
        this.entityList.push(brandSubModule);
        // Product SubModule
        var productSubModule = new SubModule();
        productSubModule.title = "Product";
        productSubModule.id = "THI-P";
        productSubModule.orderNumber = 3;
        productSubModule.imagePath = "./img/sub-module/product.jpg";
        productSubModule.icon = "fa fa-database";
        productSubModule.header = "Header";
        productSubModule.description = "Description";
        this.entityList.push(productSubModule);
        // Type SubModule
        var typeSubModule = new SubModule();
        typeSubModule.title = "Type";
        typeSubModule.id = "THI-C";
        typeSubModule.orderNumber = 1;
        typeSubModule.imagePath = "./img/sub-module/type.jpg";
        typeSubModule.icon = "fa fa-users";
        typeSubModule.header = "Header";
        typeSubModule.description = "Description";
        this.entityList.push(typeSubModule);

        this.entityList.sort(function (entity1, entity2) { return entity1.orderNumber - entity2.orderNumber });
    }

    private addObjectNameToEntities(entityList: Object[], entity): void {
        entityList.forEach(element => {
            element['name'] = entity.name;
        });
    }

    private openSubModule(moduleId: string, operation: string) {
        var basePath = '/hawker';
        var modulePath = '/InventoryManagement';
        var subModulePath;
        var operationPath;

        switch (moduleId) {
            case "THI-T":
                subModulePath = '/Type';
                break;
            case "THI-B":
                subModulePath = '/Brand';
                break;
            case "THI-P":
                subModulePath = '/Product';
                break;
            default:
                break;
        }

        if (operation == 'list') {
            operationPath = '/List';
        }
        if (operation == 'add') {
            operationPath = '/Add';
        }

        this._router.navigate([basePath + modulePath + subModulePath + operationPath]);
    }
}