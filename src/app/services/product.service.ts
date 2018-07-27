import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class ProductService  extends DataService {
  constructor(http:HttpClient) {
    super(http,'product/new')
  }

  getProductById(id){
    return this.http.get(this.apiUrl+'product/basic-list/'+id)
  }

  addStock(formData){
    return this.http.post(this.apiUrl+'product/bulk-product/add-stock',formData)
  }

  addTrackProductStock(formData){
    return this.http.post(this.apiUrl+'product/add-stock',formData)
  }

  removeTrackProductStock(id){
    return this.http.delete(this.apiUrl+'product/remove-stock/'+id)
  }
  productRemoveProperty(id){
    return this.http.delete(this.apiUrl+'product/remove-property/'+id)
  }
  productAddProperty(formData){
    return this.http.post(this.apiUrl+'product/add-property',formData)
  }

  productBranch(formData){
    return this.http.post(this.apiUrl+'product/branch-product',formData)
  }
  removeStock(formData){
    return this.http.post(this.apiUrl+'product/bulk-product/remove-stock',formData)
  }

  updateProduct(formData){
    return this.http.post(this.apiUrl+"product/basic-update", formData);
  }

  updatePrice(formData){
    return this.http.post(this.apiUrl+"branch-product/price-update", formData);
  }

  updatePropertyValue(id,formData){
    console.log(id);
    console.log(formData);
    
    
    return this.http.put(this.apiUrl+"track-product/update/"+id, formData);
  }

}
