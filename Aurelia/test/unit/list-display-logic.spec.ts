import { HttpClientStub } from '../../src/stubs/http-client.stub';
import { CompaniesServiceStub } from '../../src/stubs/companies.service.stub';
import { ListDisplay } from '../../src/components/list_display/list-display';

describe('ListDisplay component', () => {

  let companiesServiceStub: CompaniesServiceStub;
  let httpClientStub: HttpClientStub;
  let listDisplayComponent: ListDisplay;

  beforeAll(() => {
    this.httpClientStub = new HttpClientStub();
    this.companiesServiceStub = new CompaniesServiceStub(this.httpClientStub)
    this.listDisplayComponent = new ListDisplay(this.companiesServiceStub);
  });

  beforeEach(() => {
    this.listDisplayComponent.companies = [];
  });

  it('must populate its companies list when the component is created', () => {
    this.listDisplayComponent.created();

    expect(this.listDisplayComponent.companies.length).toEqual(2);
  });

  it('must populate its companies list when populateList method is called', () => {
    this.listDisplayComponent.populateList();

    expect(this.listDisplayComponent.companies.length).toEqual(2);
  });
});
