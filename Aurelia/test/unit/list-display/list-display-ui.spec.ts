import { HttpClient } from 'aurelia-fetch-client';
import { StageComponent, ComponentTester } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

import { HttpClientStub } from '../../../src/stubs/http-client.stub';
import { CompaniesServiceStub } from '../../../src/stubs/companies.service.stub';
import { CompaniesService } from '../../../src/services/companies.service';

describe('ListDisplay component', () => {

  let companiesServiceStub: CompaniesServiceStub;
  let httpClientStub: HttpClientStub;
  let component: ComponentTester<any>;

  beforeAll(() => {
    this.httpClientStub = new HttpClientStub();
    this.companiesServiceStub = new CompaniesServiceStub(this.httpClientStub);
    this.component = StageComponent
        .withResources('components/list-display/list-display')
        .inView('<list-display></list-display>');

    this.component.bootstrap(aurelia => {
        const configuration = aurelia.use.standardConfiguration();
      
        aurelia.container.registerInstance(HttpClient, this.httpClientStub);
        aurelia.container.registerInstance(CompaniesService, this.companiesServiceStub);
      
        return configuration;
    });
  });

  it('must render list of companies with proper amount of items', done => {
    this.component.create(bootstrap).then(() => {
      const companiesListElement = document.querySelector('.list-group');
      const amountOfListItems = companiesListElement.querySelectorAll('.list-group-item').length;

      expect(amountOfListItems).toEqual(2, 'Company list does not include proper amount of items');

      done();
    });
  });

  it('must render proper names for list items', done => {
    this.component.create(bootstrap).then(() => {
      const companiesListElement = document.querySelector('.list-group');
      const listItems = companiesListElement.querySelectorAll('.list-group-item');
      const firstElementCompanyDescription = listItems[0].querySelector('.company-description');
      const secondElementCompanyDescription = listItems[1].querySelector('.company-description');

      expect(firstElementCompanyDescription.innerHTML).toEqual('testCompanyDescription_1', 'First list element is not rendered properly');
      expect(secondElementCompanyDescription.innerHTML).toEqual('testCompanyDescription_2', 'Second list element is not rendered properly');

      done();
    });
  });

  it('must trigger populating list after cliking refresh button', done => {
    this.component.create(bootstrap).then(() => {
      const numberOfCalls = this.companiesServiceStub.timesCalled;
      const refreshButton = document.querySelector('.refresh-button') as HTMLElement;

      refreshButton.click();

      expect(this.companiesServiceStub.timesCalled).toEqual(numberOfCalls+1, 'Refresh button did not trigger list population');

      done();
    });
  });

  afterEach(() => {
    this.component.dispose();
  });
});
