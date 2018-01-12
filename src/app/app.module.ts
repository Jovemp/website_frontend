import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {CommonModule} from '@angular/common';

import {ScrollToModule} from 'ng2-scroll-to';


import { PrincipalService } from './header/principal.service';
import { MenuService } from './header/menu/menu.service';
import { ProdutoService } from './produto/produto.service';
import { ConfiguracaoService } from './adm/adm-configuracao/configuracao.service';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { ProdutoComponent } from './produto/produto.component';
import { PaginaPrincipalComponent, SafeHtmlPipe } from './pagina-principal/pagina-principal.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginService } from './adm/adm-login/login.service';
import { AdmLoginComponent } from './adm/adm-login/adm-login.component';
import { AuthGuard } from './guards/auth.guard';

import { ROUTES } from './app.routes';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { LoadImagemService } from './adm/adm-cadastro-produto/load-imagem.service';
import { ContatoComponent } from './contato/contato.component';
import { ContatoService } from './contato/contato.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    PaginaPrincipalComponent,
    ProdutoComponent,
    ClienteComponent,
    AdmLoginComponent,
    SafeHtmlPipe,
    ContatoComponent,
  ],
  imports: [
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    SharedModule.forRoot(),
    CommonModule, 
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    PrincipalService,
    MenuService,
    ProdutoService,
    LoadImagemService,
    ConfiguracaoService,
    ContatoService,
    LoginService,
    AuthGuard
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule]
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
