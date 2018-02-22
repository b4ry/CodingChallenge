import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Observable } from 'rxjs/Observable'; 
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";

@inject(HttpClient)
export class DrawService {

    constructor(private httpClient: HttpClient) {}

    public getCompanies(): Observable<any> {
        return Observable.fromPromise(this.httpClient.fetch('companies').then(response => response.json()).then(data => data.Companies));
    }
}