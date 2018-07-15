import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoriesNewComponent } from './accessories-new/accessories-new.component';
import { AccessoriesListComponent } from './accessories-list/accessories-list.component';

const routes: Routes = [
  {path:"" , component:AccessoriesListComponent},
  {path:"acc-new" , component:AccessoriesNewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessoriesRoutingModule { }
