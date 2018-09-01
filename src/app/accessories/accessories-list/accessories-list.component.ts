import { Component, OnInit } from '@angular/core';
import { AccessoriesService } from '../../services/accessories.service';
import { BranchService } from '../../services/branch.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.scss']
})
export class AccessoriesListComponent implements OnInit {
  accessoriesList;
  imageUrl=environment.imageUrl;
  accessoriesCategoryList;
  selecetdCategory;
  constructor(private acc:AccessoriesService, private router:Router, private brachService:BranchService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  getAccessoriesList(id){
    this.accessoriesList=this.accessoriesCategoryList[id].accessories;
    this.selecetdCategory=this.accessoriesCategoryList[id].id;
  }

  editCategoty(id){
    this.router.navigate(['accessories/cat-new/'+id],{skipLocationChange:true})
  }

  getCategoryList(){
    this.acc.get().subscribe(response=>{
      this.accessoriesCategoryList = response;
      this.getAccessoriesList(0);
    })
  }

  addNewAccessory(){
    this.router.navigate(['accessories/acc-new/'+this.selecetdCategory],{skipLocationChange:true})
  }

  selectedCategory(cat){
    this.selecetdCategory=this.accessoriesCategoryList[cat.value].id;
    this.getAccessoriesList(cat.value);
  }

  editProduct(row){
    this.router.navigate(['accessories/acc-new/'+this.selecetdCategory,row.id ],{skipLocationChange:true})
  }

  deleteAccessory(id){
    this.acc.delete(id).subscribe(response=>{
      this.getCategoryList();
    })
  }
}
