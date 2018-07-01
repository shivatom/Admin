import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchNewComponent } from './branch-new/branch-new.component';

const routes: Routes = [
  {path:"" , component:BranchListComponent},
  {path:"branch-new" , component:BranchNewComponent},
  {path:"branch-edit" , component:BranchNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
