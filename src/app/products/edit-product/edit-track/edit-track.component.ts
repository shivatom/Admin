import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';

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
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.trackableProduct=this.product.trackableProduct;
  }

  rowEditMode(index,status){
    for (var key in this.trackableProduct[0]) {
      this.editing[index + '-'+key]=status;
    }
   
    if(!status && this.trackableProduct[index].status=='new'){
      console.log(index)
      this.trackableProduct.splice(index,1)
    }
  }

  addNewItem(){
    this.trackableProduct.unshift({
      "identifier": "Humphrey Curtis",
      "status": "new"
    })
    this.editing[0 + '-identifier']=true;
  } 

  addStock(index ,id){
    console.log(this.stock)
    // this.productService.addTrackProductStock().subscribe(response=>{
    //   console.log(response);
    // })
  }
}
