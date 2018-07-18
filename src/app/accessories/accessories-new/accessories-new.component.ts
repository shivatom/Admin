import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccessoriesService } from '../../services/accessories.service';
import { ActivatedRoute } from '@angular/router';
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
  imageUrl=environment.imageUrl;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private fb:FormBuilder , private router:ActivatedRoute, private acc:AccessoriesService) { 
    this.cat_id=router.snapshot.paramMap.get('id');
    this.item_id=router.snapshot.paramMap.get('itemid');
    
    this.accessoriesForm= fb.group(
    {  
      id:[],
      accessoryName:['',Validators.required],
      description:['',Validators.required],
      perHour:['',Validators.required],
      perDay:['',Validators.required],
      categoryId:[this.cat_id],
      imageFile:['']
    });
  }
  
  ngOnInit() {
    if(this.item_id){
      this.acc.getAccessoryByCatId(this.item_id).subscribe(response=>{
        this.acc_data=response;
        this.accessoriesForm.setValue({
          id:this.acc_data[0].id,
          accessoryName:this.acc_data[0].accessoryName,
          description:this.acc_data[0].description,
          perHour:this.acc_data[0].perDay,
          perDay:this.acc_data[0].perDay,
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
      this.error.show=true;
      this.error.status='success';
      this.error.text="Product is updated successfully!!";
      this.accessoriesForm.reset();
    },error=>{
      this.error.show=true;
      this.error.status='danger';
      this.error.text="Error in updating!!";
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
