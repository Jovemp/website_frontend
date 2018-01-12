import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { ProdutoService } from '../produto/produto.service';

import { Menu } from '../model/menu.model';
import { Produto } from '../model/produto.model';

import { MenuService } from '../header/menu/menu.service';

import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html'
})
export class PaginaPrincipalComponent implements OnInit {

  produtos: Produto[] = [];
  paginas: Menu[] = [];
  @Input() menu: Menu;

  constructor(private produtoService: ProdutoService,
    private menuService: MenuService ) { }

  ngOnInit() {
    this.menuService.getPaginas()
      .subscribe(menus => {
        this.paginas = menus;
      });
    this.produtoService.getProduto()
          .subscribe(prod => {
            this.produtos = prod;
          });
  }

}
