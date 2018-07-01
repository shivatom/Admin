import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-new',
  templateUrl: './branch-new.component.html',
  styleUrls: ['./branch-new.component.scss']
})
export class BranchNewComponent implements OnInit {
  product:FormGroup;
  image;
  constructor(private fb:FormBuilder) { 
    this.product= fb.group(
     {  
       branchCode:['',Validators.required],
       branchName:['',Validators.required],
       branchDescription:['',Validators.required],
       address:['',Validators.required],
       latitude:['',Validators.required],
       longitude:['',Validators.required],
     }
    );
  }

  

  ngOnInit() {}



  // getter
  get productName(){
    return this.product.get('group_name');
  }
  get productDescription(){
    return this.product.get('group_description');
  }
  get productCategory(){
    return this.product.get('group_code');
  }
  
}
