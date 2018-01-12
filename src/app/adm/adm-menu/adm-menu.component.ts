import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../adm-login/login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adm-menu',
  templateUrl: './adm-menu.component.html'
})
export class AdmMenuComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  isShowModal: Boolean = true;
  isModalOpen: Boolean = false;
  senhaForm: FormGroup;

  ngOnInit() {
    this.limpaCampo();
  }

  limpaCampo(){
    this.senhaForm = this.formBuilder.group({
      senhaAtual: this.formBuilder.control('', [Validators.required]),
      senhaNova: this.formBuilder.control('', [Validators.required]),
      confirmacao: this.formBuilder.control('', [Validators.required])
    }, {
      validator: AdmMenuComponent.equalsTo
    });
  }

  abrirDialogo(modal: any){
    this.limpaCampo();
    modal.show();
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const senha = group.get('senhaNova');
    const confirmacao = group.get('confirmacao');

    if (!senha || !confirmacao){
      return undefined;
    }

    if (senha.value !== confirmacao.value){
      return {emailsNotMatch: true};
    }
    return undefined;
  }

  logoof(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  isLogado(){
    if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
    }
    return false;
  }

  alterar(senha: any, modal: any) {
    var dados = JSON.parse(localStorage.getItem('currentUser'));
    senha.usuario = dados.usuario;
    senha._id = dados.id;

    senha.senhaNova = CryptoJS.MD5(senha.senhaNova).toString();
    senha.senhaAtual = CryptoJS.MD5(senha.senhaAtual).toString();
    this.loginService.alteraSenha(senha)
      .subscribe(retorno => {
        if (retorno.nModified === 1){
          modal.hide();
        } else {

        }
      });
  }

}
