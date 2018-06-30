import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { CalenderRoutingModule } from './calender-routing.module';
import { CalenderComponent } from './calender/calender.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot(),
    CalenderRoutingModule
  ],
  declarations: [CalenderComponent]
})
export class CalenderModule { }
