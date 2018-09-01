import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { CityNewComponent } from './city-new/city-new.component';

const routes: Routes = [
  {path:"" , component:CityListComponent},
  {path:"city-new" , component:CityNewComponent},
  {path:"city-edit/:id" , component:CityNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
