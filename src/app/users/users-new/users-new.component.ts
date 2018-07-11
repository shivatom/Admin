import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../services/user.service';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {
  userForm:FormGroup;
  branchList;
  productId;
  userDetails;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private router:Router , private route:ActivatedRoute , private fb:FormBuilder , private brachService:BranchService, private userService:UserService) { 
    this.userForm =fb.group({
      id:[],
      fullName:['',Validators.required],
      mobileNumber:['',[Validators.required, CustomValidators.phone]],
      email:['',[Validators.email]],
      password:['',Validators.required],
      userType:['',Validators.required],
      branch_id:['']
    })
    this.productId=route.snapshot.paramMap.get('id');
    this.getBranchList();
  }

  ngOnInit() {
    if(this.productId){
      this.userService.getBy(this.productId).subscribe(response=>{
        this.userDetails =response;
        this.userForm.setValue({
          id:this.userDetails.id,
          fullName:this.userDetails.fullName,
          mobileNumber:this.userDetails.mobileNumber,
          email:this.userDetails.email,
          password:this.userDetails.password,
          userType:(this.userDetails.roles=="ROLE_BRANCH")?"branch-admin":'admin',
          branch_id:(this.userDetails.branch_id)?this.userDetails.branch_id:'',
        });
      })
    }
  }

  getBranchList(){
    this.brachService.get().subscribe(response=>{
      this.branchList = response;
    })
  }
  addUser(){
    this.userService.create(this.userForm.value).subscribe(response=>{
      this.error.show=true;
      this.error.status='success';
      this.error.text="User is updated successfully!!";
      this.userForm.reset();
    },error=>{
      this.error.show=true;
      this.error.status='danger';
      this.error.text="Error in updating!!";
    })
  }

  get usertype(){
    return  this.userForm.get('userType').value;
  }

}
