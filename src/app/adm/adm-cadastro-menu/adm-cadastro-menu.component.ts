import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Menu } from '../../model/menu.model';
import { MenuService } from '../../header/menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adm-cadastro-menu',
  templateUrl: './adm-cadastro-menu.component.html',
  styleUrls: ['./adm-cadastro-menu.component.css'],

})
export class AdmCadastroMenuComponent implements OnInit {


  public options: Object = {
    placeholderText: 'Corpo da sua pagina!',
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

  menuForm: FormGroup;

  numberPattern = /^[0-9]*$/;

  constructor(private formBuilder: FormBuilder,
    private menuService: MenuService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    var codigo = this.activatedRouter.snapshot.params['id'];
    console.log(codigo)
    this.menuForm = this.formBuilder.group({
      descricao: this.formBuilder.control('', [Validators.required]),
      link: this.formBuilder.control('', [Validators.required]),
      order: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      tela_principal: this.formBuilder.control(true, [Validators.required]),
      lista_produto: this.formBuilder.control(false, [Validators.required]),
      contato: this.formBuilder.control(false, [Validators.required]),
      corpo: this.formBuilder.control('')
    });
    if (codigo != 'novo') {
      this.menuService.getMenu(codigo)
        .subscribe(menu => {
          this.menuForm = this.formBuilder.group({
            _id: this.formBuilder.control(menu._id),
            descricao: this.formBuilder.control(menu.descricao, [Validators.required]),
            link: this.formBuilder.control(menu.link, [Validators.required]),
            order: this.formBuilder.control(menu.order, [Validators.required, Validators.pattern(this.numberPattern)]),
            tela_principal: this.formBuilder.control(menu.tela_principal, [Validators.required]),
            lista_produto: this.formBuilder.control(menu.lista_produto, [Validators.required]),
            contato: this.formBuilder.control(menu.contato, [Validators.required]),
            corpo: this.formBuilder.control(menu.corpo)
          });
        })
    }
  }

  salvar(menu: Menu) {
    if (menu._id){
      this.menuService.alterar(menu)
      .subscribe((orderId: string) => {
        this.router.navigate(['/adm/menu']);
      });
    } else {
      this.menuService.salvar(menu)
      .subscribe((orderId: string) => {
        this.router.navigate(['/adm/menu']);
      });
    }
  }

}
