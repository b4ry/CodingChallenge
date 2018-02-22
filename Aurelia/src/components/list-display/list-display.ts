import { inject } from 'aurelia-framework';
import 'rxjs/add/operator/takeWhile';

import { CompaniesService } from './../../services/companies.service';
import { Company } from './../../interfaces/company.interface';

@inject(CompaniesService)
export class ListDisplay {

    public companies: Company[] = [];

    private aliveCompanySubscription: boolean = true;

    constructor(private companiesService: CompaniesService) {
    }

    created() {
        this.populateList();
    }

    unbind() {
        this.aliveCompanySubscription = false;
    }

    populateList() {
        this.companiesService.getCompanies()
            .takeWhile(() => this.aliveCompanySubscription)
            .subscribe(result => {
                this.companies = <Company[]>result;
            });
    }
}