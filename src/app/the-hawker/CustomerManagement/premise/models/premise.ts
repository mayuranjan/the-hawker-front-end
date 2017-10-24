import { BaseEntityObject } from "app/the-hawker/CORE/abstracts/base-entityObject";
import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";

export class Premise extends BaseEntityObject implements IEntityObject {
    public name: string = Premise.name;
    public premiseId: number;
    public addressLine1: string;
    public addressLine2: string;
    public area: string;
    public builder: string;
    public country: string;
    public landmark: string;
    public premiseName: string;
    public pincode: number;
    public state: string;
    public type: string;
}