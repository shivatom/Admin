import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit {
  category:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.category= fb.group(
      {  
        categoryName:['',Validators.required],
        categoryDescription:['',Validators.required],
        isActive:['',Validators.required]
      }
     );
  }

  ngOnInit() {
  }

}
