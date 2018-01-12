import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AdmMenuComponent } from './adm-menu/adm-menu.component';
import { AdmListagemMenuComponent } from './adm-listagem-menu/adm-listagem-menu.component';
import { AdmCadastroMenuComponent } from './adm-cadastro-menu/adm-cadastro-menu.component';
import { AdmListagemProdutoComponent } from './adm-listagem-produto/adm-listagem-produto.component';
import { AdmCadastroProdutoComponent } from './adm-cadastro-produto/adm-cadastro-produto.component';
import { AdmConfiguracaoComponent } from './adm-configuracao/adm-configuracao.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { AdmComponent } from './adm.component';
import { SharedModule } from '../shared/shared.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

const ROUTES: Routes = [
    {
        path: '', component: AdmComponent, children: [
            { path: '', component: AdmHomeComponent },
            { path: 'menu', component: AdmListagemMenuComponent},
            { path: 'menu/:id', component: AdmCadastroMenuComponent },
            { path: 'produto', component: AdmListagemProdutoComponent },
            { path: 'produto/:id', component: AdmCadastroProdutoComponent },
            { path: 'configuracao', component: AdmConfiguracaoComponent }
        ]
    }
]

@NgModule({
    declarations: [
        AdmComponent,
        AdmMenuComponent,
        AdmListagemMenuComponent,
        AdmCadastroMenuComponent,
        AdmListagemProdutoComponent,
        AdmCadastroProdutoComponent,
        AdmConfiguracaoComponent,
        AdmHomeComponent
    ],
    providers: [
    ],
    imports: [RouterModule, SharedModule, FroalaEditorModule, FroalaViewModule, RouterModule.forChild(ROUTES)]
})
export class AdmModule { }