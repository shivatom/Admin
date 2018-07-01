import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
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
    req.open('GET', `assets/data/category.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  } 

  editProduct(){
    this.router.navigate(['category/edit'])
  }

}
