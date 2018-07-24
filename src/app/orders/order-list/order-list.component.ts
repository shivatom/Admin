import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderlist;
  temp;
  constructor(private router:Router , private orderService:OrderService) {
  }

  ngOnInit() {
    this.orderService.get().subscribe(response=>{
      this.orderlist=response;
      console.log(this.orderlist);
      
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.identifier.toLowerCase().indexOf(val) !== -1 || !val;
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
