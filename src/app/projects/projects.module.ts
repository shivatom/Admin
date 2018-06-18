import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './project/project.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [ProjectComponent]
})
export class ProjectsModule { }
