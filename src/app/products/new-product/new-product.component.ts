import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product:FormGroup;
  image;
  constructor(private fb:FormBuilder) { 
    this.product= fb.group(
     {  
       project_name:['',Validators.required],
       project_description:['',Validators.required],
       project_cat:['',Validators.required],
       project_branch:['',Validators.required],
       price_hour:['',Validators.required],
       price_day:['',Validators.required],
       price_weekly:['',Validators.required],
       quantity:['',Validators.required],
       tack_type:['',Validators.required],
       files:['']
     }
    );
  }

  onSelectImage(event){
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
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
    return this.product.get('price_weekly');
  }
  get tackType(){
    return this.product.get('tack_type');
  }
}
