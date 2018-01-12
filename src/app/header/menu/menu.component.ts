import { Component, OnInit } from '@angular/core';

import {Menu} from '../../model/menu.model';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menus: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus()
      .subscribe(menus => this.menus = menus);
  }

}
