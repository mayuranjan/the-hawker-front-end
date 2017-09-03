import { NG_SPINNING_PRELOADER_TYPE } from './preloaderTypes';
export declare class NgSpinningPreloader {
    document: any;
    _container: NG_SPINNING_PRELOADER_TYPE;
    constructor(document: any);
    start(): void;
    stop(): void;
    container: NG_SPINNING_PRELOADER_TYPE;
    static errorHandler(): void;
}
