import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList ;
  constructor(private router:Router, private productService:ProductService) { 
    this.getProductList();
  }

  ngOnInit() {
  }

  getProductList(){
    this.productService.getByURL('product/basic-list').subscribe(response=>{
      this.productList=response;
      console.log(this.productList);
      
    })
  }

  fetch(data){
    //API Call
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  } 

  editProduct(id){
    this.router.navigate(['products/edit-product/'+id],{skipLocationChange:true})
  }

}
