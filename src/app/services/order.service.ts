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

  getProductList(formData){
    return this.http.post(this.apiUrl+"order-list/get-product-list", formData,this.token);
  }

  startOrderItem(id){

    return this.http.put(this.apiUrl+"orders/starts/"+id,null,this.token);
  }

  stopOrderItem(id){

    return this.http.put(this.apiUrl+"orders/stops/"+id,null,this.token);
  }

  cancelOrderItem(id){

    return this.http.put(this.apiUrl+"orders/cancel/"+id,null,this.token);
  }
}
