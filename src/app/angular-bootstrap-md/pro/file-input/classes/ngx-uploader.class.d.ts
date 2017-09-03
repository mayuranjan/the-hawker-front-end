import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/combineLatest';
export declare enum UploadStatus {
    Queue = 0,
    Uploading = 1,
    Done = 2,
    Canceled = 3,
}
export interface UploadProgress {
    status: UploadStatus;
    data?: {
        percentage: number;
        speed: number;
        speedHuman: string;
    };
}
export interface UploadFile {
    id: string;
    fileIndex: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    progress: UploadProgress;
    response?: any;
}
export interface UploadOutput {
    type: 'addedToQueue' | 'allAddedToQueue' | 'uploading' | 'done' | 'removed' | 'start' | 'cancelled' | 'dragOver' | 'dragOut' | 'drop';
    file?: UploadFile;
}
export interface UploadInput {
    type: 'uploadAll' | 'uploadFile' | 'cancel' | 'cancelAll';
    url?: string;
    method?: string;
    id?: string;
    fileIndex?: number;
    file?: UploadFile;
    data?: {
        [key: string]: string | Blob;
    };
    headers?: {
        [key: string]: string;
    };
    concurrency?: number;
}
export declare function humanizeBytes(bytes: number): string;
export declare class NgUploaderService {
    fileList: FileList;
    files: UploadFile[];
    uploads: {
        file?: UploadFile;
        files?: UploadFile[];
        sub: Subscription;
    }[];
    serviceEvents: EventEmitter<UploadOutput>;
    constructor();
    handleFiles(files: FileList): void;
    initInputEvents(input: EventEmitter<UploadInput>): void;
    uploadFile(file: UploadFile, event: UploadInput): Observable<UploadOutput>;
    generateId(): string;
}
