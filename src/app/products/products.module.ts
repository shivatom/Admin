import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CalendarModule } from 'angular-calendar';
import { EditTrackComponent } from './edit-product/edit-track/edit-track.component';
import { EditBulkComponent } from './edit-product/edit-bulk/edit-bulk.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,    
    ProductsRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [ProductComponent, NewProductComponent, EditProductComponent, EditTrackComponent, EditBulkComponent]
})
export class ProductsModule { }
