import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';
@Component({
  selector: 'app-group-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  branchList ;
  constructor(private router:Router , private brachService:BranchService) { 
    //AlertComponent.show();
  }

  ngOnInit() {
    
    this.brachService.get().subscribe(response=>{
      this.branchList = response;
    })
  }


  editProduct(row){
    this.router.navigate(['branch/branch-edit' ,row.id ],{skipLocationChange:true})
  }
}
