import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-home'
  },
  {
    state: 'products',
    name: 'Products',
    type: 'link',
    icon: 'basic-case'
  },{
    state: 'accessories',
    name: 'Accessories',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'order',
    name: 'Order',
    type: 'link',
    icon: 'ecommerce-cart'
  },
  {
    state: 'customers',
    name: 'Customers',
    type: 'link',
    icon: 'basic-accelerator'
  },{
    state: 'category',
    name: 'Category',
    type: 'link',
    icon: 'basic-accelerator'
  },{
    state: 'branch',
    name: 'Branch',
    type: 'link',
    icon: 'basic-accelerator'
  },{
    state: 'users',
    name: 'Users',
    type: 'link',
    icon: 'basic-accelerator'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
