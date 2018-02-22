import * as moment from 'moment'

import { DateService } from "../services/date.service";

export class DateServiceStub extends DateService {
    public getDate(): moment.Moment {
        let date: moment.Moment = moment('1000-10-10');

        return date;
    }
}