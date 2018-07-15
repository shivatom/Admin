import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessoriesRoutingModule } from './accessories-routing.module';
import { AccessoriesListComponent } from './accessories-list/accessories-list.component';
import { AccessoriesNewComponent } from './accessories-new/accessories-new.component';
import { SharedModule } from '../shared/shared.module';
import { AccessoriesCategoryComponent } from './accessories-category/accessories-category.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccessoriesRoutingModule
  ],
  declarations: [AccessoriesListComponent, AccessoriesNewComponent, AccessoriesCategoryComponent]
})
export class AccessoriesModule { }
