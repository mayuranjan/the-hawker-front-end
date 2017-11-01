import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";

export class SubModule implements IEntityObject {
    public name: string = SubModule.name;
    public id: string;
    public orderNumber: number;
    public imagePath: string;
    public icon: string;
    public header: string;
    public title: string;
    public description: string;
}