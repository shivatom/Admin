import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accessories-new',
  templateUrl: './accessories-new.component.html',
  styleUrls: ['./accessories-new.component.scss']
})
export class AccessoriesNewComponent implements OnInit {
  accessoriesForm:FormGroup;
  image;
  error={
    show:false,
    text:"",
    status:""
  };
  constructor(private fb:FormBuilder) { 
    this.accessoriesForm= fb.group(
    {  
      name:['',Validators.required],
      description:['',Validators.required],
      stock:['',Validators.required],
      perHour:['',Validators.required],
      perDay:['',Validators.required],
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
