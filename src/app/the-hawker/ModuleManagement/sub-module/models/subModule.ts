import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";

export class SubModule implements IEntityObject {
    public name: string = SubModule.name;
    public title: string;
    public description: string;
}