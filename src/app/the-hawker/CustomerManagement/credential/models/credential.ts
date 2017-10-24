import { BaseEntityObject } from "app/the-hawker/CORE/abstracts/base-entityObject";
import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";

export class Credential extends BaseEntityObject implements IEntityObject {
    public name: string = Credential.name;
    public credentialId: number;
    public accountType: string;
    public emailId: string;
    public masterCredentialId: string;
    public mobileNumber: string;
    public username: string;
}