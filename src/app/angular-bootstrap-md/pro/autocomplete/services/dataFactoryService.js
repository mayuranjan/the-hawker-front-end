import { Http } from "@angular/http";
import { LocalData } from "./localDataService";
import { RemoteData } from "./remoteDataService";
export function localDataFactory() {
    return function () {
        return new LocalData();
    };
}
export function remoteDataFactory(http) {
    return function () {
        return new RemoteData(http);
    };
}
export var LocalDataFactoryProvider = { provide: LocalData, useFactory: localDataFactory };
export var RemoteDataFactoryProvider = { provide: RemoteData, useFactory: remoteDataFactory, deps: [Http] };
//# sourceMappingURL=dataFactoryService.js.map