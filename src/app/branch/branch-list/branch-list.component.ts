import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
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
    req.open('GET', `assets/data/branch.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  } 

  editProduct(){
    this.router.navigate(['branch/branch-edit'])
  }
}
