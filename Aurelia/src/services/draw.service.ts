import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Observable } from 'rxjs/Observable'; 
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";

import { Draw } from '../interfaces/draw.interface';
import { DrawClosingTimeRequest } from '../interfaces/draw-closing-time-request.interface';

@inject(HttpClient)
export class DrawService {

    private postRequest: DrawClosingTimeRequest;

    constructor(private httpClient: HttpClient) {
        this.postRequest = {
            CompanyId: "GoldenCasket",
            MaxDrawCount: 1,
            OptionalProductFilter: [ "OzLotto" ]
        };
    }

    created() {
    }

    public retrieveDrawInformation(): Observable<Draw[]> {
        return Observable
            .fromPromise(
                this.httpClient
                    .fetch('opendraws', {
                        method: 'post',
                        body: json(this.postRequest)
                    })
                    .then(response => response.json())
                    .then(data => data.Draws)
            );
    }
}