import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private router:Router , private fb:FormBuilder , private brachService:BranchService, private userService:UserService) { 
    this.userForm =fb.group({
      id:[],
      fullName:['',Validators.required],
      mobileNumber:['',[Validators.required, CustomValidators.phone]],
      email:['',[Validators.email]],
      password:['',Validators.required],
      userType:['',Validators.required],
      branch_id:['']
    })
    this.getBranchList();
  }

  ngOnInit() {
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
