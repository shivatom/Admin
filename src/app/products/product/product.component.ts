import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  rows = [];
  constructor() { 
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

}
