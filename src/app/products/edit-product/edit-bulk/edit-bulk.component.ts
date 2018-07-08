import { Component, OnInit ,Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-bulk',
  templateUrl: './edit-bulk.component.html',
  styleUrls: ['./edit-bulk.component.scss']
})
export class EditBulkComponent implements OnInit {
  @Input() product;
  total_stock=0;
  productForm:FormGroup;
  constructor(private productService:ProductService) {
    this.productForm=new FormGroup({
      id:new FormControl(),
      stock:new FormControl()
    })
  }

  ngOnInit() {
    console.log(this.product);
    this.total_stock=this.product.stock;
  }

  addStock(input){
    this.total_stock=this.total_stock+Number(input.value);
    this.productForm.get('id').setValue(this.product.id);
    this.productForm.get('stock').setValue(this.total_stock);
    input.value="";
    console.log(this.productForm.value);
    
    this.productService.addStock (this.productForm.value).subscribe(Response=>{
      console.log(Response);
    })
  }

  removeStock(input){
    this.total_stock=this.total_stock-Number(input.value);
    console.log(this.total_stock);
    if(this.total_stock<=0) this.total_stock=0;
    console.log(this.total_stock);
    input.value="";
    this.productForm.get('id').setValue(this.product.id);
    this.productForm.get('stock').setValue(this.total_stock);
    
    this.productService.removeStock(this.productForm.value).subscribe(Response=>{
      console.log(Response);
    })
  }

}
