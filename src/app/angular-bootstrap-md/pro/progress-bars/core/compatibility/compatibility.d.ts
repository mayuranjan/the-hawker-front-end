import { ModuleWithProviders, OpaqueToken, ElementRef } from '@angular/core';
import { MdError } from '../errors/errors';
export declare const MATERIAL_COMPATIBILITY_MODE: OpaqueToken;
export declare class MdCompatibilityInvalidPrefixError extends MdError {
    constructor(prefix: string, nodeName: string);
}
export declare const MAT_ELEMENTS_SELECTOR: string;
export declare const MD_ELEMENTS_SELECTOR: string;
export declare class MatPrefixRejector {
    constructor(isCompatibilityMode: boolean, elementRef: ElementRef);
}
export declare class MdPrefixRejector {
    constructor(isCompatibilityMode: boolean, elementRef: ElementRef);
}
export declare class CompatibilityModule {
    private _document;
    static forRoot(): ModuleWithProviders;
    constructor(_document: any);
    private _checkDoctype();
    private _checkTheme();
}
export declare class NoConflictStyleCompatibilityMode {
}
