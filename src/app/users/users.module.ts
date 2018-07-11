import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '../shared/shared.module';
import { UsersNewComponent } from './users-new/users-new.component';
import { FilterCustomerPipe } from '../shared/pipe/filter-customer.pipe';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [UsersListComponent, UsersNewComponent],

})
export class UsersModule { }
