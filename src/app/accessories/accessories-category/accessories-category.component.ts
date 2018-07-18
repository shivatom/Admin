import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccessoriesService } from '../../services/accessories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accessories-category',
  templateUrl: './accessories-category.component.html',
  styleUrls: ['./accessories-category.component.scss']
})
export class AccessoriesCategoryComponent implements OnInit {

  accessoriesForm:FormGroup;
  image;
  id;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private fb:FormBuilder, private router:ActivatedRoute, private categoryService:AccessoriesService) { 
    this.id=router.snapshot.paramMap.get('id');
    this.accessoriesForm= fb.group(
    {  
      id:[''],
      categoryName:['',Validators.required],
      description:['',Validators.required]
    });
  }
  
  ngOnInit() {
    if(this.id){
      this.categoryService.getBy(this.id).subscribe(response=>{
      console.log(response);
      this.error.show=true;
      this.error.status='success';
      this.error.text="Product is updated successfully!!";
    })
    }
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
