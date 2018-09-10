import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../../shared/models/company.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(companies: Company[], filter: string): any {
    if (!companies || !filter) {
      return companies;
    }

    return companies.filter(company => {
      return company.name.toLowerCase().startsWith(filter.toLowerCase());
    });
  }

}
