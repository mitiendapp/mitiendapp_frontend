import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from "@angular/common/http";
let ClientService = class ClientService {
    constructor(http) {
        this.http = http;
    }
    postRequest(route, data, queries, headers) {
        let reqHeaders = new HttpHeaders();
        let reqParams = new HttpParams();
        if (headers) {
            Object.getOwnPropertyNames(headers).forEach((key) => {
                reqHeaders = reqHeaders.set(key, headers[key]);
            });
        }
        if (queries) {
            Object.getOwnPropertyNames(queries).forEach((key) => {
                reqParams = reqParams.set(key, queries[key]);
            });
        }
        return this.http.post(route, data, {
            headers: reqHeaders,
            params: reqParams,
            responseType: "json",
            withCredentials: true,
        });
    }
};
ClientService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClientService);
export { ClientService };
//# sourceMappingURL=client.service.js.map