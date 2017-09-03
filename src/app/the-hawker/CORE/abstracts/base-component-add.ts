import { FormMode } from './../models/formMode';

export abstract class BaseComponentAdd
{
    mode: FormMode = new FormMode('add');
    constructor(private entity: Object) { }
}