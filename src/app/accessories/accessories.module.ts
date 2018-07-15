import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessoriesRoutingModule } from './accessories-routing.module';
import { AccessoriesListComponent } from './accessories-list/accessories-list.component';
import { AccessoriesNewComponent } from './accessories-new/accessories-new.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccessoriesRoutingModule
  ],
  declarations: [AccessoriesListComponent, AccessoriesNewComponent]
})
export class AccessoriesModule { }
