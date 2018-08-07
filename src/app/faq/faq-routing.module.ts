import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqNewComponent } from './faq-new/faq-new.component';

const routes: Routes = [
  {path:"" , component:FaqListComponent},
  {path:"faq-new" , component:FaqNewComponent},
  {path:"faq-edit/:id" , component:FaqNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
