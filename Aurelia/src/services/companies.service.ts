import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { Observable } from "rxjs/Observable";

import { Company } from "../models/company.model";

@inject(HttpClient)
export class CompaniesService {

    constructor(private httpClient: HttpClient) {}

    public getCompaniesObservable(): Observable<Company[]> {
        return Observable
            .fromPromise(
                this.httpClient
                    .fetch("companies")
                    .then((response) => response.json())
                    .then((data) => data.Companies)
            )
            .catch((err) => { throw new Error(err.status + " : " + err.statusText); } );
    }
}