import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class AccessoriesService extends DataService{

  constructor( http:HttpClient , private router:Router) {
    super(http,'accessories')
   }

   createCategory(formData){
      return this.http.post(this.apiUrl+'accessory-category',formData ,this.token)
   
   }

}
