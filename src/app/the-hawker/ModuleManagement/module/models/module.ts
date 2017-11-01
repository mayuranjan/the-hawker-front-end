import { IEntityObject } from "app/the-hawker/CORE/interfaces/i-entityObject";
import { SubModule } from "app/the-hawker/ModuleManagement/sub-module/models/subModule";

export class Module implements IEntityObject {
    public name: string = Module.name;
    public id: string;
    public orderNumber: number;
    public imagePath: string;
    public icon: string;
    public header: string;
    public title: string;
    public description: string;
    public subModules: Array<SubModule>;
}