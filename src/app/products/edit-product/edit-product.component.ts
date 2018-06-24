import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  rows = [];
  editing={}
  temp;
  constructor() { 
    this.fetch((data) => {
      this.temp =data;
      this.rows = data;
    });
  }

  fetch(data){
    //API Call
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/product.json`);
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
    this.rows.unshift({
      "identifier": "Humphrey Curtis",
      "status": "new"
    })
    this.editing[0 + '-identifier']=true;
  }

  ngOnInit() {
  }

}
