import "rxjs/add/operator/takeWhile";
import { inject } from "aurelia-framework";
import * as moment from "moment";

import { DateService } from "../../services/date.service";
import { Draw } from "../../models/draw.model";
import { DrawService } from "../../services/draw.service";

@inject(DrawService, DateService)
export class CountdownTimer {
  public amount: number;
  public isDrawToday: boolean = false;
  public secondRemainingToDraw: number;

  private refreshCountDownId: NodeJS.Timer;
  private aliveNextDrawComponentSubscription: boolean = true;
  private drawDateUTC: moment.Moment;

  constructor(private drawService: DrawService, private dateService: DateService) {}

  public created(): void {
    this.aliveNextDrawComponentSubscription = true;
    this.initializeTimer();
  }

  public unbind(): void {
    this.aliveNextDrawComponentSubscription = false;
    clearInterval(this.refreshCountDownId);
  }

  private initializeTimer(): void {
    this.drawService.retrieveDrawInformationObservable()
      .takeWhile(() => this.aliveNextDrawComponentSubscription)
      .subscribe((result) => {

        if (result.length > 1) {
          throw new Error("Cannot handle more than one item in the collection!");
        }

        const draw = Object.create(Draw.prototype);
        Object.assign(draw, result[0]);

        this.amount = draw.Div1Amount;
        this.secondRemainingToDraw = draw.DrawCountDownTimerSeconds;

        const drawDate: Date = new Date(draw.DrawDate);
        this.drawDateUTC = moment(drawDate);

        this.startCountdown();
      });
  }

  private startCountdown(): void {
    this.determineIfDrawingIsToday();
    this.refreshCountDownId = setInterval(() => {
      this.doCountdown();
    }, 1000);
  }

  private doCountdown(): void {
    const nextRemainingTime: number = this.secondRemainingToDraw - 1;

    if (this.isCountdownFinished(nextRemainingTime)) {
      this.resetTimer();
    } else {
      this.secondRemainingToDraw = nextRemainingTime;
      this.determineIfDrawingIsToday();
    }
  }

  private determineIfDrawingIsToday() {
    const currentDateUTC: moment.Moment = this.dateService.getDate();

    if (this.isDrawDateToday(currentDateUTC)) {
      this.isDrawToday = true;
    }
  }

  private isDrawDateToday(currentDateUTC: moment.Moment) {
    return !this.isDrawToday && currentDateUTC.isSame(this.drawDateUTC, "d");
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