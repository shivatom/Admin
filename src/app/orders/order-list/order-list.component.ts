import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  rows = [];
  editing={}
  temp;
  constructor(private router:Router) {
    this.fetch((data) => {
      this.temp =data;
      this.rows = data;
    });
   }
   fetch(data){
    //API Call
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/orders.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  } 
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.identifier.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

  statusFilter(event){
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

  rowEditMode(index,status){
    for (var key in this.rows[0]) {
      this.editing[index + '-'+key]=status;
    }
   
    if(!status && this.rows[index].status=='new'){
      console.log(index)
      this.rows.splice(index,1)
    }
  }

  addNewItem(){
    this.router.navigate(['order/new']);
  }

  ngOnInit() {
  }

}
