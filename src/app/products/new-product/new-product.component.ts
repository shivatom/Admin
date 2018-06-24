import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product:FormGroup;
  image
  constructor(private fb:FormBuilder) { 
    this.product= fb.group(
     {  
       project_name:['',Validators.required],
       project_description:['',Validators.required],
       project_cat:['',Validators.required],
       project_branch:['',Validators.required],
       project_price:['',Validators.required],
       payment:['simple',Validators.required],
       quantity:['',Validators.required],
       tack_type:['',Validators.required],
       files:['']
     }
    );
  }

  onSelectImage(event){
   
  }

  ngOnInit() {
    
  }



  // getter
  get productName(){
    return this.product.get('project_name');
  }
  get productDescription(){
    return this.product.get('project_description');
  }
  get productCategory(){
    return this.product.get('project_cat');
  }
  get productGroup(){
    return this.product.get('project_branch');
  }
  get productPrice(){
    return this.product.get('project_price');
  }
  get tackType(){
    return this.product.get('tack_type');
  }
}
