import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
  exports:      [ AccordionAnchorDirective,    FormsModule,    ReactiveFormsModule, NgxDatatableModule , AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
  providers: 	[ MenuItems ]
})
export class SharedModule { }
