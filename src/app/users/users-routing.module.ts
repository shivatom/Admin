import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersNewComponent } from './users-new/users-new.component';

const routes: Routes = [
  {path:"", component:UsersListComponent},
  {path:"user-new", component:UsersNewComponent},
  {path:"user-new/:id", component:UsersNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
