import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CityNewComponent } from './city-new/city-new.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityRoutingModule } from './city-routing.module';
import { CityService } from '../services/city.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CityRoutingModule
  ],
  declarations: [CityListComponent, CityNewComponent],
  providers:[]
})
export class CityModule { }
