import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCustomer'
})
export class FilterCustomerPipe implements PipeTransform {

  transform(user: any, args?: any): any {
    return user.filter(item => item.roles=='ROLE_USER');
  }

}
