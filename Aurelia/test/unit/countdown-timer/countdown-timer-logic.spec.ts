import { CountdownTimer } from "../../../src/components/countdown-timer/countdown-timer";
import { HttpClientStub } from "../../../src/stubs/http-client.stub";
import { DrawServiceStub } from "../../../src/stubs/draw.service.stub";
import { DateServiceStub } from "../../../src/stubs/date.service.stub";

describe('CountdownTimer component', () => {

  let drawServiceStub: DrawServiceStub;
  let dateServiceStub: DateServiceStub;
  let httpClientStub: HttpClientStub;
  let countdownTimerComponent: CountdownTimer;

  beforeAll(() => {
    this.httpClientStub = new HttpClientStub();
    this.drawServiceStub = new DrawServiceStub(this.httpClientStub)
    this.dateServiceStub = new DateServiceStub();
    this.countdownTimerComponent = new CountdownTimer(this.drawServiceStub, this.dateServiceStub);
  });

  it('must have it isDrawProperty set to true when the current date equals draw date', done => {
    this.countdownTimerComponent.created();

    expect(this.countdownTimerComponent.isDrawToday).toBeTruthy('isDrawProperty was not set to true');
    done();
  });

  it('must call countdown many times', done => {
    this.countdownTimerComponent.created();
    
    window.setTimeout(() => {
      expect(this.drawServiceStub.timesCalled).toBeGreaterThan(1, 'Did not run countdown multiple times');
      done();
    }, 3000);
  });

  afterEach(() => {
    this.countdownTimerComponent.unbind();
    this.drawServiceStub.timesCalled = 0;
  });

});
