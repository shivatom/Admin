import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccessoriesService } from '../../services/accessories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accessories-new',
  templateUrl: './accessories-new.component.html',
  styleUrls: ['./accessories-new.component.scss']
})
export class AccessoriesNewComponent implements OnInit {
  accessoriesForm:FormGroup;
  cat_id;
  image;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private fb:FormBuilder , private router:ActivatedRoute, private acc:AccessoriesService) { 
    this.cat_id=router.snapshot.paramMap.get('id');
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
