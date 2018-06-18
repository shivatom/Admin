import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  editing = {};
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

  rowEditMode(index,status){
    for (var key in this.rows[0]) {
      console.log(this.editing[index + '-'+key])
      this.editing[index + '-'+key]=status;
    }
  }

  updateValue( row ,data) {
    console.log(data)
    this.rowEditMode(row,false)
    for (var key in this.rows[row]) {
      //this.rows[row][key]=data;
    }
  }

}
