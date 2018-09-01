import { BranchService } from './../../services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccessoriesService } from '../../services/accessories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accessories-new',
  templateUrl: './accessories-new.component.html',
  styleUrls: ['./accessories-new.component.scss']
})
export class AccessoriesNewComponent implements OnInit {
  accessoriesForm:FormGroup;
  cat_id;
  item_id;
  acc_data;
  image;
  branchList;
  imageUrl=environment.imageUrl;
  editMode=false;
  constructor(private fb:FormBuilder, private route:Router , private router:ActivatedRoute, private acc:AccessoriesService, private toastr: ToastrService,  private brachService:BranchService) { 
    this.cat_id=router.snapshot.paramMap.get('id');
    this.item_id=router.snapshot.paramMap.get('itemid');
    if(!this.cat_id)
      this.route.navigate(['/accessories']);
    
    this.accessoriesForm= fb.group(
    {  
      id:[],
      accessoryName:['',Validators.required],
      description:['',Validators.required],
      perHour:['',Validators.required],
      perDay:['',Validators.required],
      branchId:['',Validators.required],
      categoryId:[this.cat_id],
      imageFile:['']
    });
  }
  
  ngOnInit() {
    this.getallBranch();
    if(this.item_id){
      this.editMode=true;
      this.acc.getAccessoryByCatId(this.item_id).subscribe(response=>{
        this.acc_data=response;
        this.accessoriesForm.setValue({
          id:this.acc_data[0].id,
          accessoryName:this.acc_data[0].accessoryName,
          description:this.acc_data[0].description,
          perHour:this.acc_data[0].perDay,
          perDay:this.acc_data[0].perDay,
          branchId:this.acc_data[0].branches.id,
          categoryId:this.acc_data[0].accessoriesCategory.id,
          imageFile:''
        })
        
       
        // this.settingForm.get('categoryId').setValue(this.product.category.id);
        // this.settingForm.get('imageFile').setValue(this.product.logo);
        // this.product.logo=this.product.logo.replace(" ",'');
        this.image=this.imageUrl+"accessories/images/"+this.acc_data[0].logo;

      },error=>{
        
      })
    }
  }

  getallBranch(){
    this.brachService.get().subscribe(response=>{
      this.branchList = response;
    })
  }
  onSelectImage(event){
    var myReader: FileReader = new FileReader();
    this.accessoriesForm.get('imageFile').setValue(event.target.files[0]);
    myReader.onloadend = (e) => {
      this.image=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
  }

  addAccessories(){
    this.acc.create(this.acc.createFormData(this.accessoriesForm.value)).subscribe(response=>{
      this.toastr.success('Accessory updated Successfully.');
      if(!this.editMode)
        this.accessoriesForm.reset();
      },error=>{
        this.toastr.error('Some problem occured. Check your connection.');
      })
  }

  // getter
  get accessoriesName(){
    return this.accessoriesForm.get('name');
  }
  get accessoriesDescription(){
    return this.accessoriesForm.get('description');
  }
  get accessoriesHour(){
    return this.accessoriesForm.get('perHour');
  }
  get accessoriesDay(){
    return this.accessoriesForm.get('perDay');
  }
  get accessoriesStock(){
    return this.accessoriesForm.get('stock');
  }

}
