import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'docs',
    loadChildren: './docs/docs.module#DocsModule'
  }
  ,{
    path: 'order',
    loadChildren: './orders/orders.module#OrdersModule'
  },{
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule'
  },{
    path: 'calender',
    loadChildren: './calender/calender.module#CalenderModule'
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  },{
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**',
  redirectTo: 'error/404'
}];

