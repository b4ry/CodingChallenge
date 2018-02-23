import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import { Draw } from '../models/draw.model';
import { DrawClosingTimeRequest } from '../models/draw-closing-time-request.model';

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

    public retrieveDrawInformationObservable(): Observable<Draw[]> {
        return Observable
            .fromPromise(
                this.httpClient
                    .fetch('opendraws', {
                        method: 'post',
                        body: json(this.postRequest)
                    })
                    .then(response => response.json())
                    .then(data => data.Draws)
            )
            .catch(err => { throw new Error(err.message); });
    }
}