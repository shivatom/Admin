import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BranchNewComponent } from './branch-new/branch-new.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchService } from '../services/branch.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BranchRoutingModule
  ],
  declarations: [BranchListComponent, BranchNewComponent],
  providers:[]
})
export class BranchModule { }
