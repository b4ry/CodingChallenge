import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Observable } from 'rxjs/Observable'; 
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";

import { Draw } from '../interfaces/draw.interface';

@inject(HttpClient)
export class DrawService {

    private postRequest;

    constructor(private httpClient: HttpClient) {}

    public retrieveDrawInformation(): Observable<Draw[]> {
        return Observable
            .fromPromise(
                this.httpClient
                    .fetch('opendraws', {
                        method: 'post',
                        body: json(this.postRequest)
                    })
                    .then(response => response.json())
                    .then(data => data.Companies)
            );
    }
}