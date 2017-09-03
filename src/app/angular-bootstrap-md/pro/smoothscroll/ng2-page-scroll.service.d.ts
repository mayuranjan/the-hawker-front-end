import { PageScrollInstance } from './ng2-page-scroll-instance';
export declare class PageScrollService {
    private static instanceCounter;
    private runningInstances;
    private onInterrupted;
    private stopInternal(interrupted, pageScrollInstance);
    start(pageScrollInstance: PageScrollInstance): void;
    stopAll(namespace?: string): boolean;
    stop(pageScrollInstance: PageScrollInstance): boolean;
    constructor();
}
