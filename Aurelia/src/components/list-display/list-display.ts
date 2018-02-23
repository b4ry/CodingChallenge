import { inject } from 'aurelia-framework';
import 'rxjs/add/operator/takeWhile';

import { CompaniesService } from './../../services/companies.service';
import { Company } from './../../models/company.model';

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

    public populateList(): void {
        this.companiesService.getCompaniesObservable()
            .takeWhile(() => this.aliveCompanySubscription)
            .subscribe(result => {
                result.forEach(element => {
                    let company = Object.create(Company.prototype);
                    Object.assign(company, element);
                    this.companies.push(company);
                });
            });
    }
}