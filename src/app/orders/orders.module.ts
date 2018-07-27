import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from '../shared/shared.module';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderViewComponent } from './order-view/order-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [OrderListComponent, OrderNewComponent, OrderViewComponent]
})
export class OrdersModule { }
