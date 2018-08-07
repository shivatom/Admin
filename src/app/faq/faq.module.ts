import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FaqNewComponent } from './faq-new/faq-new.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqService } from '../services/faq.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FaqRoutingModule
  ],
  declarations: [FaqListComponent, FaqNewComponent],
  providers:[]
})
export class FaqModule { }
