import { Injectable, Inject } from "@angular/core";
import { LocalData } from "./localDataService";
import { RemoteData } from "./remoteDataService";
var CompleterService = (function () {
    function CompleterService(localDataFactory, remoteDataFactory) {
        this.localDataFactory = localDataFactory;
        this.remoteDataFactory = remoteDataFactory;
    }
    CompleterService.prototype.local = function (data, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var localData = this.localDataFactory();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    CompleterService.prototype.remote = function (url, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var remoteData = this.remoteDataFactory();
        return remoteData
            .remoteUrl(url)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    return CompleterService;
}());
export { CompleterService };
CompleterService.decorators = [
    { type: Injectable },
];
CompleterService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [LocalData,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [RemoteData,] },] },
]; };
//# sourceMappingURL=completerService.js.map