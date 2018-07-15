import { Component, OnInit } from '@angular/core';
import { AccessoriesService } from '../../services/accessories.service';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.scss']
})
export class AccessoriesListComponent implements OnInit {
  accessoriesList;
  constructor(private acc:AccessoriesService,private brachService:BranchService) { }

  ngOnInit() {
    
    this.brachService.get().subscribe(response=>{
      this.accessoriesList = response;
    })
  }


  editProduct(row){
    //this.router.navigate(['branch/branch-edit' ,row.id ],{skipLocationChange:true})
  }
}
