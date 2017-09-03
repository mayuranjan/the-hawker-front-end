import { BaseEntityObject } from "app/the-hawker/CORE/abstracts/base-entityObject";
import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";

export class Product extends BaseEntityObject implements IEntityObject {
    public name: string = Product.name;
    public productId: number;
    public brandId: number;
    public typeId: number;
    public productName: string;
    public productDescription: string;
    public productCode: string;
    public costPrice: number;
    public retailSellingPrice: number;
    public retailDeliveryCharges: number;
    public wholesaleSellingPrice: number;
    public wholesaleDeliveryCharges: number;
    public expiryInDays: number;
    public volume: string;
    public manufacturersCode: string;
}