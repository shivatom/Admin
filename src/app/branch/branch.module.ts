import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BranchNewComponent } from './branch-new/branch-new.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchRoutingModule } from './branch-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BranchRoutingModule
  ],
  declarations: [BranchListComponent, BranchNewComponent]
})
export class BranchModule { }
