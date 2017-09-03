export class FormMode {
    public add: boolean = false;
    public view: boolean = false;
    public update: boolean = false;

    public operation: string;

    public icon: string;

    constructor(mode:string) {
        switch (mode.toLowerCase()) {
            case 'add':
                this.add = true;
                this.operation = "Add";
                this.icon = "fa-pencil";
                break;
            case 'view':
                this.view = true;
                this.operation = "View";
                this.icon = "fa-envelope-open";
                break;
            case 'update':
                this.update = true;
                this.operation = "Update";
                this.icon = "fa-edit";              
                break;
            default:
                this.add = true;
                this.operation = "Add";
                this.icon = "fa-pencil";
                break;
        }
    }
}