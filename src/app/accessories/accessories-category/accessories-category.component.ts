import { ToastrService } from 'ngx-toastr';
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
  editMode=false;
  image;
  id;
  cat_list;
  constructor(private fb:FormBuilder, private router:ActivatedRoute, private categoryService:AccessoriesService, private toastr: ToastrService) { 
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
      this.editMode=true;
      this.categoryService.getCategory(this.id).subscribe(response=>{
        this.cat_list=response;
        
        this.accessoriesForm.setValue({
          id:this.cat_list[0].id,
          categoryName:this.cat_list[0].id,
          description:this.cat_list[0].id
        })
        
      })
    }
  }

  addCategory(){
    this.categoryService.createCategory(this.accessoriesForm.value).subscribe(response=>{
      this.toastr.success('Accessory category updated Successfully.');
      if(!this.editMode)
        this.accessoriesForm.reset();
    }, error=>{
      this.toastr.error('Some problem occured. Check your connection.');
    })
  }

  
}
