import { Product } from './../../product/models/product';
import { BaseEntityObject } from "app/the-hawker/CORE/abstracts/base-entityObject";
import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";

export class Brand extends BaseEntityObject implements IEntityObject {
    public name: string = Brand.name;
    public brandId: number;
    public brandName: string;
    public brandDescription: string;
    public brandCode: string;
    public products: Product[];
}