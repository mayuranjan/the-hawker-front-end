import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { element } from 'protractor';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { ModuleService } from 'app/the-hawker/ModuleManagement/module/services/module.service';
import { Module } from 'app/the-hawker/ModuleManagement/module/models/module';

@Component({
    selector: 'module-list',
    templateUrl: './module-list.template.html',
    styleUrls: ['./module-list.template.css'],
    providers: [ModuleService]
})
export class ModuleListComponent {
    static key = ModuleListComponent.name;

    private entity: Object;
    private idField: string
    private entityList: Object[];
    private selectedEntity: Object = this.entity;

    constructor(private _moduleService: ModuleService) {
        this.entity = new Module();
        this.idField = 'moduleId';
        this.listAll();
    }

    protected listAll(): void {
        // this._moduleService.list().subscribe(response => {
        //     if (response.status == 'Success') {
        //         this.entityList = response.object;
        //         this.addObjectNameToEntities(this.entityList, new Module());
        //     }
        // });

        this.entityList = new Array<Module>();

        // Admin Management Module
        var adminModule = new Module();
        adminModule.title = "Admin Management";
        adminModule.imagePath = "./img/module/admin-management.jpg";
        adminModule.icon = "fa fa-cubes";
        adminModule.header = "Header";
        adminModule.description = "Description";
        this.entityList.push(adminModule);
        // Backend Management Module
        var backendModule = new Module();
        backendModule.title = "Backend Management";
        backendModule.imagePath = "./img/module/backend-management.jpg";
        backendModule.icon = "fa fa-cubes";
        backendModule.header = "Header";
        backendModule.description = "Description";
        this.entityList.push(backendModule);
        // Customer Management Module
        var customerModule = new Module();
        customerModule.title = "Customer Management";
        customerModule.imagePath = "./img/module/customer-management.jpg";
        customerModule.icon = "fa fa-cubes";
        customerModule.header = "Header";
        customerModule.description = "Description";
        this.entityList.push(customerModule);
        // Delivery Management Module
        var deliveryModule = new Module();
        deliveryModule.title = "Delivery Management";
        deliveryModule.imagePath = "./img/module/delivery-management.jpg";
        deliveryModule.icon = "fa fa-cubes";
        deliveryModule.header = "Header";
        deliveryModule.description = "Description";
        this.entityList.push(deliveryModule);
        // Inventory Management Module
        var inventoryModule = new Module();
        inventoryModule.title = "Inventory Management";
        inventoryModule.imagePath = "./img/module/inventory-management.jpg";
        inventoryModule.icon = "fa fa-cubes";
        inventoryModule.header = "Header";
        inventoryModule.description = "Description";
        this.entityList.push(inventoryModule);
        // Support Management Module
        var supportModule = new Module();
        supportModule.title = "Support Management";
        supportModule.imagePath = "./img/module/support-management.jpg";
        supportModule.icon = "fa fa-cubes";
        supportModule.header = "Header";
        supportModule.description = "Description";
        this.entityList.push(supportModule);
        // Transport Management Module
        var transportModule = new Module();
        transportModule.title = "Transport Management";
        transportModule.imagePath = "./img/module/transport-management.jpg";
        transportModule.icon = "fa fa-cubes";
        transportModule.header = "Header";
        transportModule.description = "Description";
        this.entityList.push(transportModule);
        // Vendor Management Module
        var vendorModule = new Module();
        vendorModule.title = "Vendor Management";
        vendorModule.imagePath = "./img/module/vendor-management.jpg";
        vendorModule.icon = "fa fa-cubes";
        vendorModule.header = "Header";
        vendorModule.description = "Description";
        this.entityList.push(vendorModule);
    }

    private addObjectNameToEntities(entityList: Object[], entity): void {
        entityList.forEach(element => {
            element['name'] = entity.name;
        });
    }
}