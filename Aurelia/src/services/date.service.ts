import * as moment from 'moment'

export class DateService {
    constructor() {  
    }

    public getDate(): moment.Moment {
        let currentDate: Date = new Date(Date.now());
        
        return moment.utc(currentDate);
    }
}