import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccessoriesService } from '../../services/accessories.service';

@Component({
  selector: 'app-accessories-category',
  templateUrl: './accessories-category.component.html',
  styleUrls: ['./accessories-category.component.scss']
})
export class AccessoriesCategoryComponent implements OnInit {

  accessoriesForm:FormGroup;
  image;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private fb:FormBuilder, private categoryService:AccessoriesService) { 
    this.accessoriesForm= fb.group(
    {  
      id:[''],
      categoryName:['',Validators.required],
      description:['',Validators.required]
    });
  }
  
  ngOnInit() {
  }

  addCategory(){
    this.categoryService.createCategory(this.accessoriesForm.value).subscribe(response=>{
      console.log(response);
      this.error.show=true;
      this.error.status='success';
      this.error.text="Product is updated successfully!!";
    })
  }
}
