import { Component, OnInit } from '@angular/core';

import { Menu } from '../../model/menu.model';
import { MenuService } from '../../header/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-listagem-menu',
  templateUrl: './adm-listagem-menu.component.html',
  styleUrls: [
    './adm-listagem-menu.component.css'
  ]
})
export class AdmListagemMenuComponent implements OnInit {

  menus: Menu[] = [];

  constructor(private menuService: MenuService,
    private router: Router) { }

  ngOnInit() {
    this.menuService.getMenus()
      .subscribe(menus => {
        this.menus = menus;
      });
  }

  deletar(menu: Menu) {
    this.menuService.deletar(menu)
      .subscribe(menu => {
        console.log(menu);
        this.menuService.getMenus()
          .subscribe(menus => this.menus = menus);
      });
  }

}
