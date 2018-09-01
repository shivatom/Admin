import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  hasError=false;
  hasError1=false;
  constructor(private fb: FormBuilder, private router: Router, private auth:AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      _username: [null , Validators.compose ( [ Validators.required ] )] , _password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    this.hasError=false;
    this.hasError1=false;
    this.auth.login(this.form.value).subscribe(x=>{
      let currentUser = localStorage.getItem('current-user-role');
      console.log("hello");

      if(currentUser == 'ROLE_ADMIN' || currentUser == 'ROLE_BRANCH'){
        this.router.navigate ( [ '/' ] );
      }else{
        localStorage.removeItem('token');
        this.hasError1=true;
      }

       //this.router.navigate ( [ '/' ] );
    },error=>{
      this.hasError=true;
    })
    //
  }

}
