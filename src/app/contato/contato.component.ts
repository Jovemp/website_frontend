import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ContatoService } from './contato.service'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  contatoForm: FormGroup;

  telefone = '\[0-9]2\ [0-9]4,6-[0-9]3,4$';

  constructor(private formBuilder: FormBuilder,
    private contatoService: ContatoService) { }

  ngOnInit() {
    this.limpaContato();
  }

  limpaContato() {
    this.contatoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      telefone: this.formBuilder.control(''),
      message: this.formBuilder.control('', [Validators.required])
    });
  }

  enviar(contato: any) {
    console.log(contato);
    this.contatoService.enviar(contato)
      .subscribe(resp => {
        this.limpaContato();
      })
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
