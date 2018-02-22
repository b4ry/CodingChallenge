import { StageComponent } from "aurelia-testing";
import { HttpClient } from "aurelia-fetch-client";
import { bootstrap } from "aurelia-bootstrapper";

import { CountdownTimer } from "../../../src/components/countdown-timer/countdown-timer";
import { HttpClientStub } from "../../../src/stubs/http-client.stub";
import { DrawServiceStub } from "../../../src/stubs/draw.service.stub";
import { DateServiceStub } from "../../../src/stubs/date.service.stub";
import { DrawService } from "../../../src/services/draw.service";
import { DateService } from "../../../src/services/date.service";

describe('Countdowntimer component', () => {

  let drawServiceStub: DrawServiceStub;
  let dateServiceStub: DateServiceStub;
  let httpClientStub: HttpClientStub;
  let countdownTimerComponent: CountdownTimer;

  beforeAll(() => {
    this.httpClientStub = new HttpClientStub();
    this.drawServiceStub = new DrawServiceStub(this.httpClientStub);
    this.dateServiceStub = new DateServiceStub();
    this.component = StageComponent
        .withResources('components/countdown-timer/countdown-timer')
        .inView('<countdown-timer></countdown-timer>');

    this.component.bootstrap(aurelia => {
        const configuration = aurelia.use.standardConfiguration();
      
        aurelia.container.registerInstance(HttpClient, this.httpClientStub);
        aurelia.container.registerInstance(DrawService, this.drawServiceStub);
        aurelia.container.registerInstance(DateService, this.dateServiceStub);
      
        return configuration;
    });
  });

  it('must render amount value', done => {
    this.component.create(bootstrap).then(() => {
      const amountElement = document.querySelector('.amount');

      expect(amountElement.innerHTML).toEqual('5m', 'Amount was not rendered properly');

      done();
    });
  });

  it('must render time', done => {
    this.component.create(bootstrap).then(() => {
      const timeElement = document.querySelector('.countdown-time');
      const time: string = timeElement.innerHTML;

      expect(time===undefined || time===null || time==='').toBeFalsy('Time was not rendered properly');

      done();
    });
  });

  it('must render TONIGHT if the draw is the same day', done => {
    this.component.create(bootstrap).then(() => {
      const tonightElement = document.getElementsByName('tonight')[0] as HTMLElement;

      expect(tonightElement.hidden).toBeFalsy('Tonight was not rendered properly');

      done();
    });
  });

  afterEach(() => {
    this.component.dispose();
  });
});
