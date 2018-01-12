import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../produto/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-listagem-produto',
  templateUrl: './adm-listagem-produto.component.html',
  styleUrls: ['./adm-listagem-produto.component.css']
})
export class AdmListagemProdutoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit() {
    this.produtoService.getProduto()
      .subscribe(produtos => {
        this.produtos = produtos
      });
  }

  deletar(produto: Produto) {
    this.produtoService.deletar(produto)
      .subscribe(prod => {
        this.produtoService.getProduto()
          .subscribe(produtos => this.produtos = produtos);
      });
  }

}

