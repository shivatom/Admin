import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoriesNewComponent } from './accessories-new/accessories-new.component';
import { AccessoriesListComponent } from './accessories-list/accessories-list.component';
import { AccessoriesCategoryComponent } from './accessories-category/accessories-category.component';

const routes: Routes = [
  {path:"" , component:AccessoriesListComponent},
  {path:"acc-new/:id" , component:AccessoriesNewComponent},
  {path:"cat-new" , component:AccessoriesCategoryComponent},
  {path:"cat-new/:id" , component:AccessoriesCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessoriesRoutingModule { }
