import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { BranchService } from '../services/branch.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { FilterCustomerPipe } from './pipe/filter-customer.pipe';
import { AccessoriesService } from '../services/accessories.service';

@NgModule({
  declarations: [ AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective, AlertComponent, FilterCustomerPipe ],
  exports:      [ AccordionAnchorDirective, NgbModule,   FormsModule,    ReactiveFormsModule, NgxDatatableModule , AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
  providers: 	[ MenuItems, BranchService,AccessoriesService, CategoryService,ProductService,UserService ,FilterCustomerPipe]
})
export class SharedModule { }
