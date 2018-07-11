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
      const temp = this.userList.filter(function(d) {
        return d.roles.indexOf('ROLE_USER') == -1 ;
      });
      this.userList=temp;
    })
  }

  editProduct(id){
    this.router.navigate(['users/user-new/'+id],{skipLocationChange:true})
  }


  deleteUser(id){
    this.userService.delete(id).subscribe(Response=>{
      
    })
  }
}
