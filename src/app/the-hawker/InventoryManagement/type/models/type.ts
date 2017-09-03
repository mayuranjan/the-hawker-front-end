
import { BaseEntityObject } from "app/the-hawker/CORE/abstracts/base-entityObject";
import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";
import { Product } from "app/the-hawker/InventoryManagement/product/models/product";

export class Type extends BaseEntityObject implements IEntityObject {
    public name: string = Type.name;
    public typeId: number;
    public typeName: string;
    public typeCategory: string;
    public typeDescription: string;
    public typeCode: string;
    public products: Product[];
}