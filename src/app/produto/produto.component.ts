import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../model/produto.model';
import { SITE } from '../app.api';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html'
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Produto;
  @Input() modal: String;

  url = SITE +'/img/';

  constructor() { }

  ngOnInit() {
  }

}
