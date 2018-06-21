import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {path:'',component:ProductComponent},
  {path:'edit-product',component:NewProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
