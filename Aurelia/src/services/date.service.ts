import * as moment from "moment";

export class DateService {
    // tslint:disable-next-line:no-empty
    constructor() {}

    public getDate(): moment.Moment {
        const currentDate: Date = new Date(Date.now());

        return moment.utc(currentDate);
    }
}