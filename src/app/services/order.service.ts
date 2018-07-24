import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable()
export class OrderService extends DataService {
  constructor(http:HttpClient) { 
    super(http,'orders');
  }

  makeOrder(formData){
    return this.http.post(this.apiUrl+'orders/make-new-order', formData ,this.token);
  }
}
