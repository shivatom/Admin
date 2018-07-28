import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderlist;
  customerList;
  temp;
  constructor(private router:Router , private orderService:OrderService , private userService:UserService) {
  }

  ngOnInit() {
    this.orderService.get().subscribe(response=>{
      this.orderlist=response;
      this.temp=response;
    })

    this.userService.get().subscribe(response=>{
      this.customerList=response;
      const temp = this.customerList.filter(function(d) {
        return d.roles.indexOf('ROLE_USER') != -1 ;
      });
      this.customerList=temp;
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.user.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.orderlist = temp;
  }

  statusFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.orderlist = temp;
  }

  

  addNewItem(){
    this.router.navigate(['order/new']);
  }

  

}
