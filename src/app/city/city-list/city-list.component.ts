import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '../../services/city.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cityList ;
  constructor(private router:Router , private toastr:ToastrService,  private cityService:CityService) { 
    //AlertComponent.show();
  }

  ngOnInit() {
    
    this.getallCity();
  }

  getallCity(){
    this.cityService.get().subscribe(response=>{
      this.cityList = response;
    })
  }

  deleteCity(id){
    let status=confirm("Are you sure you want to delete this item?");
    if(status)
    this.cityService.delete(id).subscribe(response=>{
      this.toastr.success('City deleted Successfully.');
      this.getallCity();
    },error=>{
      this.toastr.error('This City can not be deleted.');
    })
  }

  editCity(row){
    this.router.navigate(['city/city-edit' ,row.id ],{skipLocationChange:true})
  }
}
