import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss']
})
export class EditTrackComponent implements OnInit {
  @Input() product;
  @ViewChild ('stock') stock;
  trackableProduct;
  editing={};
  stockForm:FormGroup;
  constructor(private productService:ProductService, private modalService:NgbModal, private fb:FormBuilder) { 
    this.stockForm= fb.group({
      id:[],
      stock:['',Validators.required]
    })
  }

  ngOnInit() {
    this.trackableProduct=this.product.trackableProduct;
    console.log(this.product);
    
    this.stockForm.get('id').setValue(this.product.id);
  }

  rowEditMode(index,status){
    for (var key in this.trackableProduct[0]) {
      this.editing[index + '-'+key]=status;
    }
   
    if(!status && this.trackableProduct[index].status=='new'){
      this.trackableProduct.splice(index,1)
    }
  }

  addNewItem(){
    console.log(this.stockForm.value);
    this.productService.addTrackProductStock(this.stockForm.value).subscribe(response=>{
       this.refreshProductList();
       this.stockForm.reset();
    });
  } 

  deleteProp(id){
    this.productService.productRemoveProperty(id).subscribe(response=>{
      this.refreshProductList();
      //this.stockForm.reset();
   });
  }

  addProp(tag){
    let form=new FormData();
    form.append('id',this.product.id);
    form.append('propertyKey',tag.value);
    this.productService.productAddProperty(form).subscribe(response=>{
      this.refreshProductList();
    });
  }

  deleteStock(id){
    this.productService.removeTrackProductStock(id).subscribe(response=>{
      this.refreshProductList();
   });
  }

  refreshProductList(){
    this.productService.getProductById(this.product.id).subscribe(response=>{
      let data=response as obj;
      this.product=response;
      this.trackableProduct=data.trackableProduct;
    });
    
  }

  addStock(){
    
   // console.log(this.stock)
    // this.productService.addTrackProductStock().subscribe(response=>{
    //   console.log(response);
    // })
  }
}

class obj{
  trackableProduct
}