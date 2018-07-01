import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {path:'', component:CategoryComponent},
  {path:'new', component:CategoryNewComponent},
  {path:'edit', component:CategoryEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
