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
  constructor(private fb: FormBuilder, private router: Router, private auth:AuthService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      _username: [null , Validators.compose ( [ Validators.required ] )] , _password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe(x=>{      
      if(x){
       this.router.navigate ( [ '/' ] );
      }else{
        this.hasError=true;
      }
    },error=>{
      console.log(error);
       
      if(error.code==402){
        this.hasError=true;
      }
    })
    //
  }

}
