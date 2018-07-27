import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { NewProductComponent } from '../products/new-product/new-product.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderViewComponent } from './order-view/order-view.component';

const routes: Routes = [
  {path:'' , component:OrderListComponent},
  {path:'new' , component:OrderNewComponent},
  {path:'view/:id' , component:OrderViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
