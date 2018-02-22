import { HttpClient } from 'aurelia-fetch-client';
import {Aurelia} from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  configureContainer(aurelia.container);

  aurelia.start().then(() => aurelia.setRoot());
}

function configureContainer(container) {
  let http = new HttpClient();

  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(environment.url);
  });

  container.registerInstance(HttpClient, http);
}
