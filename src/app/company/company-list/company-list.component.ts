import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companayList;
  editMode=false;
  imageUrl=environment.imageUrl;
  constructor(private compService:CompanyService) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  getCompanyDetails(){
    this.compService.get().subscribe(response=>{
      this.companayList=response;
      console.log(response);
    });
  }

}
