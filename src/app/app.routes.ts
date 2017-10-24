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

export const TheHawkerRouter: Routes = [
    {
        path: 'hawker', component: TheHawkerTemplate,
        children: [
            { path: 'InventoryManagement/Brand', component: BrandListComponent },
            { path: 'InventoryManagement/Brand/List', component: BrandListComponent },
            { path: 'InventoryManagement/Brand/Add', component: BrandAddComponent },
            { path: 'InventoryManagement/Type', component: TypeListComponent },
            { path: 'InventoryManagement/Type/List', component: TypeListComponent },
            { path: 'InventoryManagement/Type/Add', component: TypeAddComponent },
            { path: 'InventoryManagement/Product', component: ProductListComponent },
            { path: 'InventoryManagement/Product/List', component: ProductListComponent },
            { path: 'InventoryManagement/Product/Add', component: ProductAddComponent },
            { path: 'CustomerManagement/Address', component: AddressListComponent },
            { path: 'CustomerManagement/Address/List', component: AddressListComponent },
            { path: 'CustomerManagement/Address/Add', component: AddressAddComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

