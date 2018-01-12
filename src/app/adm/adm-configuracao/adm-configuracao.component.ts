import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { OptionImgComponent } from '../../shared/link-img/link-img.component';
import { ConfiguracaoService } from './configuracao.service';
import { Configuracao } from '../../model/configuracao.model';
import * as CryptoJS from 'crypto-js';
import { senha } from './adm.api';
@Component({
  selector: 'app-adm-configuracao',
  templateUrl: './adm-configuracao.component.html',
  styleUrls: ['./adm-configuracao.component.css']
})
export class AdmConfiguracaoComponent implements OnInit {

  confForm: FormGroup;

  urlUpload: String = 'http://localhost:3005/api/upload_file';
  urlList: String = 'http://localhost:3005/api/load_images';

  public options: Object = {
    placeholderText: 'Sobre!',
    imageUploadURL: 'http://localhost:3005/api/upload_file',
    imageUploadParam: 'file',
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    imageManagerLoadURL: 'http://localhost:3005/api/load_images',
    imageManagerDeleteMethod: 'DELETE',
    imageManagerDeleteURL: 'http://localhost:3005/api/load_images',
    events: {
      'froalaEditor.file.error': function (e, editor) {
        console.log(e);
      }
    }
  }
  isModalOpen: Boolean = false;
  isShowModal: Boolean = true;

  optionsImagem: OptionImgComponent = {
    buttonAdd: false,
    buttonBrowse: true,
    buttonRemove: false,
    buttonUpload: true
  }

  constructor(private formBuilder: FormBuilder,
              private confService: ConfiguracaoService) { }

  ngOnInit() {
    this.confForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required]),
      descricao_breve: this.formBuilder.control('', [Validators.required]),
      imagem: this.formBuilder.control('http://localhost:3005/img/sem_imagem.png'),
      sobre: this.formBuilder.control(''),
      endereco: this.formBuilder.control(''),
      telefone: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      email_contato: this.formBuilder.control(''),
      senha_email: this.formBuilder.control(''),
      servico_email: this.formBuilder.control(''),
      assunto_email: this.formBuilder.control(''),
      dominio: this.formBuilder.control('')
    });
    this.confService.getConfiguracao()
      .subscribe(conf => {
        
        if (conf) {
          var s = "";
          if (conf.senha_email){
              s = CryptoJS.AES.decrypt(conf.senha_email.toString(), senha).toString(CryptoJS.enc.Utf8);
          }
          this.confForm = this.formBuilder.group({
            _id:  this.formBuilder.control(conf._id),
            nome: this.formBuilder.control(conf.nome, [Validators.required]),
            descricao_breve: this.formBuilder.control(conf.descricao_breve, [Validators.required]),
            imagem: this.formBuilder.control(conf.imagem),
            sobre: this.formBuilder.control(conf.sobre),
            endereco: this.formBuilder.control(conf.endereco),
            telefone: this.formBuilder.control(conf.telefone),
            email: this.formBuilder.control(conf.email),
            email_contato: this.formBuilder.control(conf.email_contato),
            senha_email: this.formBuilder.control(s),
            servico_email: this.formBuilder.control(conf.servico_email),
            assunto_email: this.formBuilder.control(conf.assunto_email),
            dominio: this.formBuilder.control(conf.dominio)
          });
        }
      })
  }

  salvar(conf: Configuracao, modal: any) {
    console.log(CryptoJS.AES.encrypt(conf.senha_email.toString(),senha));
    conf.senha_email = CryptoJS.AES.encrypt(conf.senha_email.toString(),senha).toString();
    console.log(conf.senha_email);
    if (conf._id) {
      this.confService.alterar(conf)
        .subscribe((orderId: string) => {
          modal.show();
        });
    } else {
      this.confService.salvar(conf)
        .subscribe((orderId: string) => {
          modal.show();
        });
    }
  }

  formatar(documento) {
    var telefone = documento.value;

    var tamanho = telefone.length; 

    if (tamanho == 0) {
      if (telefone.substring(0,1) == '(') {
         telefone = ''
       } else {
        telefone = '('+telefone;
      }
    }
    if (telefone.indexOf(')') == -1){
        if (tamanho == 3){
            var vTexto = telefone.substring(0,3);
            telefone = vTexto+') '+telefone.substring(3);
        }
    }
    if (tamanho == 12){
      if (telefone.indexOf('-') == -1){
        var vTexto = telefone.substring(0,9);
        telefone =  vTexto+'-'+telefone.substring(9);
      } else {
        var vTexto = telefone.substring(0,telefone.indexOf('-'));
        telefone =  vTexto+'-'+telefone.substring(telefone.indexOf('-')+1)
      }
    }
    if (tamanho == 13){
      if (telefone.indexOf('-') == -1){
        var vTexto = telefone.substring(0,9);
        telefone =  vTexto+'-'+telefone.substring(9);
      }
      else {
        var vTexto = telefone.substring(0,telefone.indexOf('-'))+telefone.substring(telefone.indexOf('-')+1);
        var vTexto2 = vTexto.substring(0,9); 
        vTexto =  vTexto2+'-'+vTexto.substring(9);
        telefone = vTexto;
      }
    }
    if (tamanho == 14){
      var vTexto = telefone.substring(0,telefone.indexOf('-'))+telefone.substring(telefone.indexOf('-')+1);;
      var vTexto2 = vTexto.substring(0,10);
      vTexto =  vTexto2+'-'+vTexto.substring(10);
      telefone = vTexto;
    }



    documento.value = telefone;


  }

}
