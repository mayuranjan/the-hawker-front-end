import { FormMode } from 'app/the-hawker/CORE/models/formMode';
import { element } from 'protractor';
import { iconsState } from './../../../../../typescripts/angular-bootstrap-md/pro/animations/animations';
import { Component, EventEmitter, Injector, Input, Output, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { ModalDirective } from "app/typescripts/angular-bootstrap-md/free";
import { BaseComponentList } from "app/the-hawker/CORE/abstracts/base-component-list";
import { ModuleService } from 'app/the-hawker/ModuleManagement/module/services/module.service';
import { Module } from 'app/the-hawker/ModuleManagement/module/models/module';
import { Router } from '@angular/router';

@Component({
    selector: 'module-list',
    templateUrl: './module-list.template.html',
    styleUrls: ['./module-list.template.css'],
    providers: [ModuleService]
})
export class ModuleListComponent {
    static key = ModuleListComponent.name;

    private module: Module;
    private idField: string
    private entityList: Module[];
    private selectedEntity: Object = this.module;

    constructor(private _moduleService: ModuleService, private _router: Router) {
        this.module = new Module();
        this.idField = 'moduleId';
        this.listAll();
    }

    private listAll(): void {
        this.entityList = new Array<Module>();

        // Admin Management Module
        var adminModule = new Module();
        adminModule.title = "Admin Management";
        adminModule.id = "THA";
        adminModule.orderNumber = 1;
        adminModule.imagePath = "./img/module/admin-management.jpg";
        adminModule.icon = "fa fa-briefcase";
        adminModule.header = "Header";
        adminModule.description = "Description";
        this.entityList.push(adminModule);
        // Backend Management Module
        var backendModule = new Module();
        backendModule.title = "Backend Management";
        backendModule.id = "THB";
        backendModule.orderNumber = 3;
        backendModule.imagePath = "./img/module/backend-management.jpg";
        backendModule.icon = "fa fa-database";
        backendModule.header = "Header";
        backendModule.description = "Description";
        this.entityList.push(backendModule);
        // Customer Management Module
        var customerModule = new Module();
        customerModule.title = "Customer Management";
        customerModule.id = "THC";
        customerModule.orderNumber = 2;
        customerModule.imagePath = "./img/module/customer-management.jpg";
        customerModule.icon = "fa fa-users";
        customerModule.header = "Header";
        customerModule.description = "Description";
        this.entityList.push(customerModule);
        // Delivery Management Module
        var deliveryModule = new Module();
        deliveryModule.title = "Delivery Management";
        deliveryModule.id = "THD";
        deliveryModule.orderNumber = 4;
        deliveryModule.imagePath = "./img/module/delivery-management.jpg";
        deliveryModule.icon = "fa fa-map";
        deliveryModule.header = "Header";
        deliveryModule.description = "Description";
        this.entityList.push(deliveryModule);
        // Inventory Management Module
        var inventoryModule = new Module();
        inventoryModule.title = "Inventory Management";
        inventoryModule.id = "THI";
        inventoryModule.orderNumber = 5;
        inventoryModule.imagePath = "./img/module/inventory-management.jpg";
        inventoryModule.icon = "fa fa-cubes";
        inventoryModule.header = "Header";
        inventoryModule.description = "Description";
        this.entityList.push(inventoryModule);
        // Support Management Module
        var supportModule = new Module();
        supportModule.title = "Support Management";
        supportModule.id = "THS";
        supportModule.orderNumber = 6;
        supportModule.imagePath = "./img/module/support-management.jpg";
        supportModule.icon = "fa fa-handshake-o";
        supportModule.header = "Header";
        supportModule.description = "Description";
        this.entityList.push(supportModule);
        // Transport Management Module
        var transportModule = new Module();
        transportModule.title = "Transport Management";
        transportModule.id = "THT";
        transportModule.orderNumber = 7;
        transportModule.imagePath = "./img/module/transport-management.jpg";
        transportModule.icon = "fa fa-truck";
        transportModule.header = "Header";
        transportModule.description = "Description";
        this.entityList.push(transportModule);
        // Vendor Management Module
        var vendorModule = new Module();
        vendorModule.title = "Vendor Management";
        vendorModule.id = "THV";
        vendorModule.orderNumber = 8;
        vendorModule.imagePath = "./img/module/vendor-management.jpg";
        vendorModule.icon = "fa fa-address-card";
        vendorModule.header = "Header";
        vendorModule.description = "Description";
        this.entityList.push(vendorModule);

        this.entityList.sort(function(entity1, entity2){return entity1.orderNumber-entity2.orderNumber});
    }

    private addObjectNameToEntities(entityList: Object[], entity): void {
        entityList.forEach(element => {
            element['name'] = entity.name;
        });
    }

    private openModule(moduleId) {
        this._router.navigate(['/hawker/ModuleManagement/SubModule', moduleId])
    }
}