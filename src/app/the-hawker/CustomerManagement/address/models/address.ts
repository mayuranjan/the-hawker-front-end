import { BaseEntityObject } from "app/the-hawker/CORE/abstracts/base-entityObject";
import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";
import { Credential } from "app/the-hawker/CustomerManagement/credential/models/credential";
import { Premise } from "app/the-hawker/CustomerManagement/premise/models/premise";

export class Address extends BaseEntityObject implements IEntityObject {
    public name: string = Address.name;
    public addressId: number;
    public blockNumber: string;
    public flatNumber: string;
    public floorNumber: number;
    public towerNumber: number;
    public credential: Credential;
    public premise: Premise;
}