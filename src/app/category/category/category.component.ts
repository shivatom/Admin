import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  rows = [];
  categoryList;
  constructor(private router:Router , private categoryService:CategoryService) { 

  }

  ngOnInit() {
    this.categoryService.get().subscribe(response=>{
      this.categoryList = response;
      console.log(this.categoryList)
    })
  }

  

  editProduct(row){
    this.router.navigate(['category/edit' ,row.id ],{skipLocationChange:true})
  }

}
