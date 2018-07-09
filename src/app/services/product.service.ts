import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class ProductService  extends DataService {
  constructor(http:HttpClient) {
    super(http,'product/new')
  }

  getProductById(id){
    return this.http.get(this.apiUrl+'product/basic-list/'+id,this.token)
  }

  addStock(formData){
    return this.http.post(this.apiUrl+'product/bulk-product/add-stock',formData,this.token)
  }

  addTrackProductStock(formData){
    return this.http.post(this.apiUrl+'product/track-product/add-stock',formData,this.token)
  }

  removeStock(formData){
    return this.http.post(this.apiUrl+'product/bulk-product/remove-stock',formData,this.token)
  }

  updateProduct(formData){
    return this.http.post(this.apiUrl+"product/basic-update", formData);
  }

  updatePrice(formData){
    return this.http.post(this.apiUrl+"product/price-update", formData);
  }

}
