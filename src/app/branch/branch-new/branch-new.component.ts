import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-new',
  templateUrl: './branch-new.component.html',
  styleUrls: ['./branch-new.component.scss']
})
export class BranchNewComponent implements OnInit {
  product:FormGroup;
  image;
  branch_id;
  error={
    show:false,
    text:"",
    status:""
  }
  constructor(private fb:FormBuilder, private brachService:BranchService, private route:ActivatedRoute) { 
    this.branch_id=route.snapshot.paramMap.get('id');
    
    this.product= fb.group(
     {  
       id:[''],
       branchCode:['',Validators.required],
       branchName:['',Validators.required],
       branchDescription:['',Validators.required],
       address:['',Validators.required],
       latitude:['',Validators.required],
       longitude:['',Validators.required],
       taxType:['',Validators.required],
       taxPercent:['',Validators.required],
       isActive:[''],
     }
    );
  }

  

  ngOnInit() {
    if(this.branch_id)
    this.brachService.getBy(this.branch_id).subscribe(response=>{
      this.product.setValue(response);
    })
  }

  saveBranch(){
    this.brachService.create(this.product.value).subscribe(response=>{
      this.error.show=true;
      this.error.status='success';
      this.error.text="Branch is updated successfully!!";
    },error=>{
      this.error.show=true;
      this.error.status='danger';
      this.error.text="Error in updating!!";
    })
  }

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
