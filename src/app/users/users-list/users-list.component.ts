import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userList ;
  constructor(private router:Router, private userService:UserService) { 
    this.getUserList()
  }

  ngOnInit() {
  }

  getUserList(){
    this.userService.get().subscribe(response=>{
      this.userList=response;
    })
  }


  editProduct(){
    this.router.navigate(['customers/customer-new'])
  }
}
