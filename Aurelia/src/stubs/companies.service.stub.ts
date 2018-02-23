import { Observable } from "rxjs/Observable";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../models/company.model";

export class CompaniesServiceStub extends CompaniesService {

    public timesCalled: number = 0;

    private companies: Company[] = [
        {
            CompanyId: "testCompanyId_1",
            CompanyDisplayName: "testCompanyDisplayName_1",
            CompanyDescription: "testCompanyDescription_1",
            CompanyLogoUrl: ""
        },
        {
            CompanyId: "testCompanyId_2",
            CompanyDisplayName: "testCompanyDisplayName_2",
            CompanyDescription: "testCompanyDescription_2",
            CompanyLogoUrl: ""
        }
    ];
     
    public getCompaniesObservable(): Observable<any>{
        ++this.timesCalled;
        return Observable.of(this.companies);
    }
}