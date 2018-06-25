import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  rows = [];
  constructor(private router:Router) { 
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
    });
  }

  ngOnInit() {
  }

  fetch(data){
    //API Call
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  } 

  editProduct(){
    this.router.navigate(['customers/customer-new'])
  }
}
