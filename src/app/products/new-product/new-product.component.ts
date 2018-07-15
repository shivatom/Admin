import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product:FormGroup;
  image;
  cat_list;
  branch_list;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private fb:FormBuilder , private branchService:BranchService, private productservice:ProductService, private catService:CategoryService) { 
    this.product= fb.group(
     {  
       productName:['',Validators.required],
       description:['',Validators.required],
       categoryId:['',Validators.required],
       imageFile:['']
     });
  }

  ngOnInit() {
    this.branchService.get().subscribe(response=>{
      this.branch_list=response;
    })

    this.catService.get().subscribe(response=>{
      this.cat_list=response;
    })
  }

  addProduct(){
    console.log(this.productservice.createFormData(this.product.value))
    this.productservice.create(this.productservice.createFormData(this.product.value)).subscribe(response=>{
      this.error.show=true;
      this.error.status='success';
      this.error.text="Product is updated successfully!!";
      this.product.reset();
    },error=>{
      this.error.show=true;
      this.error.status='danger';
      this.error.text="Error in updating!!";
    })
  }
  
  onSelectImage(event){
    var myReader: FileReader = new FileReader();
    this.product.get('imageFile').setValue(event.target.files[0]);
    myReader.onloadend = (e) => {
      this.image=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
  }
  

  // getter
  get productName(){
    return this.product.get('productName');
  }
  get productDescription(){
    return this.product.get('description');
  }
  get productCategory(){
    return this.product.get('categoryId');
  }
  get productGroup(){
    return this.product.get('branchId');
  }

  get tackType(){
    return this.product.get('productType');
  }
}
