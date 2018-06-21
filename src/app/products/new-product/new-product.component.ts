import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.product= fb.group(
     {  
       payment:[]
     }
    );
  }

  ngOnInit() {
    this.product.value.payment="simple";
    console.log(this.product.controls['payment'])
  }

}
