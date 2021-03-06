import { Observable } from "rxjs/Observable";

import { Draw } from "../models/draw.model";
import { DrawService } from "../services/draw.service";

export class DrawServiceStub extends DrawService {

    public timesCalled: number = 0;

    private draws: Draw[] = [
        {
            ProductId: "testProductId",
            DrawNumber: 1,
            DrawDisplayName: "testDrawDisplayName",
            DrawDate: new Date("1000-10-10").toString(),
            DrawLogoUrl: "testDrawLogoUrl",
            DrawType: "testDrawType",
            Div1Amount: 5000000.0000,
            IsDiv1Estimated: false,
            IsDiv1Unknown: false,
            DrawCloseDateTimeUTC: new Date("1000-10-10").toString(),
            DrawEndSellDateTimeUTC: "testDrawEndSellDateTimeUTC",
            DrawCountDownTimerSeconds: 1,
        },
    ];

    public retrieveDrawInformationObservable(): Observable<Draw[]> {
        ++this.timesCalled;
        return Observable.of(this.draws);
    }
}