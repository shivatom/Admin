import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-new',
  templateUrl: './city-new.component.html',
  styleUrls: ['./city-new.component.scss']
})
export class CityNewComponent implements OnInit {
  city:FormGroup;
  image;
  imageUrl=environment.imageUrl;
  city_id;
  editMode=false;
  constructor(private fb:FormBuilder, private cityService:CityService, private route:ActivatedRoute, private toastr: ToastrService) {
    this.city_id=route.snapshot.paramMap.get('id');

    this.city= fb.group(
     {
       id:[''],
       cityName:['',Validators.required],
       imageFile: ['']
     }
    );
  }



  ngOnInit() {
    if(this.city_id){
      this.editMode=true;
      this.cityService.getBy(this.city_id).subscribe(response=>{
        let data=response as CityObject;
        this.city.setValue({
          id:data.id,
          cityName: data.cityName,
          imageFile: ''
        });
        this.image=this.imageUrl+"icons/images/"+data.logo;
      })
    }
  }

  saveCity(){
    this.cityService.create(this.cityService.createFormData(this.city.value)).subscribe(response=>{
      this.toastr.success('City updated successfully.');
      if(!this.editMode)
        this.city.reset();
    },error =>{

      this.toastr.error(error.error);
    })
  }


  onSelectImage(event){
    var myReader: FileReader = new FileReader();
    this.city.get('imageFile').setValue(event.target.files[0]);
    myReader.onloadend = (e) => {
      this.image=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
  }


}

class CityObject{
  id: any;
  cityName:any;
  logo:any;
}
