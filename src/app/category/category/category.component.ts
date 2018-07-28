import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  rows = [];
  categoryList;
  constructor(private router:Router , private toastr:ToastrService, private categoryService:CategoryService) { 

  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory(){
    this.categoryService.get().subscribe(response=>{
      this.categoryList = response;
      console.log(this.categoryList)
    })
  }
  
  deleteCategory(id){
    let status=confirm("Are you sure you want to delete this item?");
    if(status)
    this.categoryService.delete(id).subscribe(response=>{
      this.toastr.success('Category deleted Successfully.');
      this.getAllCategory();
    },error=>{
      this.toastr.error('Some problem occured. Check your connection.');
    })
  }
  editProduct(row){
    this.router.navigate(['category/edit' ,row.id ],{skipLocationChange:true})
  }

}
