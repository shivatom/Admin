import { ToastrService } from 'ngx-toastr';
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
  branch:FormGroup;
  image;
  branch_id;
  editMode=false;
  constructor(private fb:FormBuilder, private brachService:BranchService, private route:ActivatedRoute, private toastr: ToastrService) { 
    this.branch_id=route.snapshot.paramMap.get('id');
    
    this.branch= fb.group(
     {  
       id:[''],
       branchCode:['',Validators.required],
       branchName:['',Validators.required],
       branchDescription:[''],
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
    if(this.branch_id){
      this.editMode=true;
      this.brachService.getBy(this.branch_id).subscribe(response=>{
        let data=response as BranchObject;
        this.branch.setValue({
          id:data.id,
          branchCode: data.branchCode,
          branchName: data.branchName,
          branchDescription: data.branchDescription || '',
          address: data.address || '',
          latitude:data.latitude || '',
          longitude:data.longitude || '',
          taxType:data.taxType,
          taxPercent:data.taxPercent,
          isActive:data.isActive,
        });
      })
    }
  }

  saveBranch(){
    this.brachService.create(this.branch.value).subscribe(response=>{
      this.toastr.success('Branch updated successfully.');
      if(!this.editMode)
        this.branch.reset();
    },error=>{
      this.toastr.error('Some problem occured. Check your connection.');
    })
  }

  // getter
  get branchName(){
    return this.branch.get('group_name');
  }
  get branchDescription(){
    return this.branch.get('group_description');
  }
  get branchCategory(){
    return this.branch.get('group_code');
  }
  
}

class BranchObject{  
  id: any;
  branchCode:any;
  branchName:any;
  branchDescription:any;
  address:any;
  latitude:any;
  longitude:any;
  taxType:any;
  taxPercent:any;
  isActive:any;
}
