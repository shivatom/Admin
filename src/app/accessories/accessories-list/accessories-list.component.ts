import { Component, OnInit } from '@angular/core';
import { AccessoriesService } from '../../services/accessories.service';
import { BranchService } from '../../services/branch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.scss']
})
export class AccessoriesListComponent implements OnInit {
  accessoriesList;
  accessoriesCategoryList;
  selecetdCategory;
  constructor(private acc:AccessoriesService, private router:Router, private brachService:BranchService) { }

  ngOnInit() {
    this.getAccessoriesList();
    this.getCategoryList();
  }

  getAccessoriesList(){
    this.acc.get().subscribe(response=>{
      this.accessoriesCategoryList = response;
    })
  }

  editCategoty(id){
    this.router.navigate(['accessories/cat-new/'+id],{skipLocationChange:true})
  }
  getCategoryList(){
    this.acc.get().subscribe(response=>{
      this.accessoriesCategoryList = response;
    })
  }
  addNewAccessory(){
    this.router.navigate(['accessories/acc-new/'+this.selecetdCategory],{skipLocationChange:true})
  }
  selectedCategory(cat){
    this.selecetdCategory=cat.value;
  }
  editProduct(row){
    //this.router.navigate(['branch/branch-edit' ,row.id ],{skipLocationChange:true})
  }
}
