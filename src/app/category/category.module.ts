import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule
  ],
  declarations: [CategoryComponent, CategoryNewComponent, CategoryEditComponent]
})
export class CategoryModule { }
