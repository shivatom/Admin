import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit {
  categoryForm:FormGroup;
  category_id;
  error={
    show:false,
    text:"",
    status:""
  }
  
  constructor(private fb:FormBuilder , private toastr:ToastrService, private route:ActivatedRoute , private categoryService:CategoryService) { 
    this.category_id=route.snapshot.paramMap.get('id');
    this.categoryForm= fb.group(
      {  
        id:[],
        categoryName:['',Validators.required],
        categoryDescription:['',Validators.required],
        isActive:['true']
      });
  }

  ngOnInit() {
    if(this.category_id)
    this.categoryService.getBy(this.category_id).subscribe(response=>{
      this.categoryForm.setValue(response);
    })
  }

  saveCategory(){
    this.categoryService.create(this.categoryForm.value).subscribe(response=>{
      this.toastr.success('Category updated Successfully.');
    },error=>{
      this.toastr.error('Some problem occured. Check your connection.');
    })
  }
}
