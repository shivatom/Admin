import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FaqService } from '../../services/faq.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {
  faqList ;
  constructor(private router:Router , private toastr:ToastrService,  private faqService:FaqService) { 
    //AlertComponent.show();
  }

  ngOnInit() {
    
    this.getallFaq();
  }

  getallFaq(){
    this.faqService.get().subscribe(response=>{
      this.faqList = response;
    })
  }

  deleteFaq(id){
    let status=confirm("Are you sure you want to delete this item?");
    if(status)
    this.faqService.delete(id).subscribe(response=>{
      this.toastr.success('Faq deleted Successfully.');
      this.getallFaq();
    },error=>{
      this.toastr.error('This Faq can not be deleted.');
    })
  }

  editProduct(row){
    this.router.navigate(['faq/faq-edit' ,row.id ],{skipLocationChange:true})
  }
}
