import { Observable } from "rxjs/Observable";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../interfaces/company.interface";

export class CompaniesServiceStub extends CompaniesService {
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
     
    public getCompanies(): Observable<any>{
        return Observable.of(this.companies);
    }
}