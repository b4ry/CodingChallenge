import { inject } from 'aurelia-framework';
import 'rxjs/add/operator/takeWhile';
import * as moment from 'moment';

import { DrawService } from "../../services/draw.service";
import { DateService } from '../../services/date.service';

@inject(DrawService, DateService)
export class CountdownTimer {    
  public amount: number;
  public isDrawToday: boolean = false;
  public secondRemainingToDraw: number;

  private refreshCountDownId: NodeJS.Timer;
  private aliveNextDrawComponentSubscription: boolean = true;
  private drawDateUTC: moment.Moment;
  
  constructor(private drawService: DrawService, private dateService: DateService) 
  { }
  
  created() {
    this.aliveNextDrawComponentSubscription = true;
    this.initializeTimer();
  }
  
  unbind() {
    this.aliveNextDrawComponentSubscription = false;
    clearInterval(this.refreshCountDownId);
  }

  private initializeTimer(): void {
    this.drawService.retrieveDrawInformationObservable()
      .takeWhile(() => this.aliveNextDrawComponentSubscription)
      .subscribe(result => {
          this.amount = result[0].Div1Amount;
          this.secondRemainingToDraw = result[0].DrawCountDownTimerSeconds;
          let drawDate: Date = new Date(result[0].DrawDate);
          this.drawDateUTC = moment(drawDate);

          this.startCountdown();
      });
  }

  private startCountdown(): void {
    this.determineIfDrawingIsToday();
    this.refreshCountDownId = setInterval(() => { this.doCountdown() }, 1000);
  }

  private doCountdown(): void {
    let nextRemainingTime: number = this.secondRemainingToDraw - 1;

    if (this.isCountdownFinished(nextRemainingTime)){
      this.resetTimer();
    } else {
      this.secondRemainingToDraw = nextRemainingTime;
      this.determineIfDrawingIsToday();
    }
  }

  private determineIfDrawingIsToday() {
    let currentDateUTC: moment.Moment = this.dateService.getDate();

    if (this.isDrawDateToday(currentDateUTC)) {
      this.isDrawToday = true;
    }
  }

  private isDrawDateToday(currentDateUTC: moment.Moment) {
    return !this.isDrawToday && currentDateUTC.isSame(this.drawDateUTC, 'd');
  }

  private resetTimer() {
    this.isDrawToday = false;
    clearInterval(this.refreshCountDownId);
    this.initializeTimer();
  }

  private isCountdownFinished(nextRemainingTime: number) {
    return nextRemainingTime < 0;
  }
}