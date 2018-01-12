import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html',
  styleUrls: ['./adm-login.component.css']
})
export class AdmLoginComponent implements OnInit {

  mensagens: String[];

  loginForm: FormGroup;

  error: String;

  loading: Boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: this.formBuilder.control(''),
      senha: this.formBuilder.control('')
    });
  }

  login(login: any) {
    this.mensagens = undefined;
    if (!login.usuario) {
      this.mensagens = [];
      this.mensagens.push('Campo usuário é obrigatório!');
    }
    if (!login.senha) {
      if (!this.mensagens) {
        this.mensagens = [];
      }
      this.mensagens.push('Campo senha é obrigatório!');
    }

    login.senha = CryptoJS.MD5(login.senha).toString();
    console.log(login);

    if (!this.mensagens) {
      this.loading = true;
      this.loginService.salvar(login)
        .subscribe(retorno => {
          if (retorno) {
            // login successful
            this.router.navigate(['adm']);
          } else {
            // login failed
            this.error = 'Usuario ou Senha esta incorreto!';
            this.loading = false;
          }
        });
    }

  }

}
