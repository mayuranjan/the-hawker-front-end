import { Routes } from '@angular/router';
import { TheHawkerTemplate } from './the-hawker-template.component'
import { PageNotFoundComponent } from './page-not-found.component'
import { BrandListComponent } from 'app/the-hawker/InventoryManagement/brand/components/list/brand-list.component';
import { BrandAddComponent } from 'app/the-hawker/InventoryManagement/brand/components/add/brand-add.component';
import { TypeListComponent } from "app/the-hawker/InventoryManagement/type/components/list/type-list.component";
import { TypeAddComponent } from "app/the-hawker/InventoryManagement/type/components/add/type-add.component";
import { ProductListComponent } from "app/the-hawker/InventoryManagement/product/components/list/product-list.component";
import { ProductAddComponent } from "app/the-hawker/InventoryManagement/product/components/add/product-add.component";
import { AddressAddComponent } from 'app/the-hawker/CustomerManagement/address/components/add/address-add.component';
import { AddressListComponent } from 'app/the-hawker/CustomerManagement/address/components/list/address-list.component';
import { CredentialListComponent } from 'app/the-hawker/CustomerManagement/credential/components/list/credential-list.component';
import { CredentialAddComponent } from 'app/the-hawker/CustomerManagement/credential/components/add/CREDENTIAL-add.component';
import { ModuleListComponent } from 'app/the-hawker/ModuleManagement/module/components/list/module-list.component';
import { SubModuleListComponent } from 'app/the-hawker/ModuleManagement/sub-module/components/list/sub-module-list.component';

export const TheHawkerRouter: Routes = [
    {
        path: 'hawker', component: TheHawkerTemplate, data: { breadcrumb: 'Home' },
        children: [
            // ***** Module Management - Module *****
            { path: 'ModuleManagement/Module', component: ModuleListComponent, data: { breadcrumb: 'Module' } },
            { path: 'ModuleManagement/SubModule/:moduleId', component: SubModuleListComponent, data: { breadcrumb: 'Sub-Module' } },

            // ***** Inventory Management - Brand *****
            { path: 'InventoryManagement/Brand', component: BrandListComponent, data: { breadcrumb: 'Brand'} },
            { path: 'InventoryManagement/Brand/List', component: BrandListComponent, data: { breadcrumb: 'Brand - List'} },
            { path: 'InventoryManagement/Brand/Add', component: BrandAddComponent, data: { breadcrumb: 'Brand - Add'} },

            // ***** Inventory Management - Type *****
            { path: 'InventoryManagement/Type', component: TypeListComponent, data: { breadcrumb: 'Type'} },
            { path: 'InventoryManagement/Type/List', component: TypeListComponent, data: { breadcrumb: 'Type - List'} },
            { path: 'InventoryManagement/Type/Add', component: TypeAddComponent, data: { breadcrumb: 'Type - Add'} },

            // ***** Inventory Management - Product *****
            { path: 'InventoryManagement/Product', component: ProductListComponent },
            { path: 'InventoryManagement/Product/List', component: ProductListComponent },
            { path: 'InventoryManagement/Product/Add', component: ProductAddComponent },

            // ***** Customer Management - Address *****
            { path: 'CustomerManagement/Address', component: AddressListComponent },
            { path: 'CustomerManagement/Address/List', component: AddressListComponent },
            { path: 'CustomerManagement/Address/Add', component: AddressAddComponent },

            // ***** Customer Management - Credential *****
            { path: 'CustomerManagement/Credential', component: CredentialListComponent },
            { path: 'CustomerManagement/Credential/List', component: CredentialListComponent },
            { path: 'CustomerManagement/Credential/Add', component: CredentialAddComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

