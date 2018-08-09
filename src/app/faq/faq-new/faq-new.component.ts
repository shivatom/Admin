import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FaqService } from '../../services/faq.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq-new',
  templateUrl: './faq-new.component.html',
  styleUrls: ['./faq-new.component.scss']
})
export class FaqNewComponent implements OnInit {
  faq:FormGroup;
  image;
  faq_id;
  editMode=false;
  constructor(private fb:FormBuilder, private faqService:FaqService, private route:ActivatedRoute, private toastr: ToastrService) { 
    this.faq_id=route.snapshot.paramMap.get('id');
    
    this.faq= fb.group(
     {  
       id:[''],
       question:['',Validators.required],
       answer:['',Validators.required],
     }
    );
  }

  

  ngOnInit() {
    if(this.faq_id){
      this.editMode=true;
      this.faqService.getBy(this.faq_id).subscribe(response=>{
        let data=response as FaqObject;
        this.faq.setValue({
          id:data.id,
          question: data.question,
          answer: data.answer,
        });
      })
    }
  }

  saveFaq(){
    this.faqService.create(this.faq.value).subscribe(response=>{
      this.toastr.success('Faq updated successfully.');
      if(!this.editMode)
        this.faq.reset();
    },error =>{
      
      this.toastr.error(error.error);
    })
  }

  
}

class FaqObject{  
  id: any;
  question:any;
  answer:any;
}
