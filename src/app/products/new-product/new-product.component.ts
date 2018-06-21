import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


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
       payment:['simple'],
       files:[]
     }
    );
  }

  onSelectImage(event){
    this.image=event.target.files[0];
   // var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(myReader.result);
    }

    myReader.readAsText(this.image);
  }

  ngOnInit() {
    this.product.value.payment="simple";
    console.log(this.product.controls['payment'])
  }

}
