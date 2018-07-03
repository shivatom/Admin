import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryNewComponent } from './category-new/category-new.component';

const routes: Routes = [
  {path:'', component:CategoryComponent},
  {path:'new', component:CategoryNewComponent},
  {path:'edit/:id', component:CategoryNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
