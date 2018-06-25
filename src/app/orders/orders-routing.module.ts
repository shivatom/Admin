import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { NewProductComponent } from '../products/new-product/new-product.component';
import { OrderNewComponent } from './order-new/order-new.component';

const routes: Routes = [
  {path:'' , component:OrderListComponent},
  {path:'new' , component:OrderNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
