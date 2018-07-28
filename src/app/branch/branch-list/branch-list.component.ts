import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-group-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  branchList ;
  constructor(private router:Router , private toastr:ToastrService,  private brachService:BranchService) { 
    //AlertComponent.show();
  }

  ngOnInit() {
    
    this.getallBranch();
  }

  getallBranch(){
    this.brachService.get().subscribe(response=>{
      this.branchList = response;
    })
  }

  deleteBranch(id){
    let status=confirm("Are you sure you want to delete this item?");
    if(status)
    this.brachService.delete(id).subscribe(response=>{
      this.toastr.success('Branch deleted Successfully.');
      this.getallBranch();
    },error=>{
      this.toastr.error('This Branch can not be deleted.');
    })
  }

  editProduct(row){
    this.router.navigate(['branch/branch-edit' ,row.id ],{skipLocationChange:true})
  }
}
