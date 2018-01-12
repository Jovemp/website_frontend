import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../produto/produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadImagemService } from './load-imagem.service';
import { OptionImgComponent } from '../../shared/link-img/link-img.component';

@Component({
  selector: 'app-adm-cadastro-produto',
  templateUrl: './adm-cadastro-produto.component.html',
  styleUrls: ['./adm-cadastro-produto.component.css']
})
export class AdmCadastroProdutoComponent implements OnInit {

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

  optionsImagem: OptionImgComponent = {
    buttonAdd: false,
    buttonBrowse: true,
    buttonRemove: false,
    buttonUpload: true
  }

  imagem: String = 'http://localhost:3005/img/sem_imagem.png';
  urlUpload: String = 'http://localhost:3005/api/upload_file';
  urlList: String = 'http://localhost:3005/api/load_images';
  produtoForm: FormGroup;


  numberPattern = /^[0-9]*$/;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private loadImagemService: LoadImagemService) { }

  ngOnInit() {
    var codigo = this.activatedRouter.snapshot.params['id'];
    this.produtoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required]),
      order: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      ativo: this.formBuilder.control(true, [Validators.required]),
      imagem: this.formBuilder.control('http://localhost:3005/img/sem_imagem.png')
    });
    if (codigo != 'novo') {
      this.produtoService.getProdutoID(codigo)
        .subscribe(produto => {
          this.produtoForm = this.formBuilder.group({
            _id: this.formBuilder.control(produto._id),
            nome: this.formBuilder.control(produto.nome, [Validators.required]),
            descricao: this.formBuilder.control(produto.descricao, [Validators.required]),
            order: this.formBuilder.control(produto.order, [Validators.required, Validators.pattern(this.numberPattern)]),
            ativo: this.formBuilder.control(produto.ativo, [Validators.required]),
            imagem: this.formBuilder.control(produto.imagem)
          });
        })
    }
  }



  upload(value: any) {
    if (value) {
      const formData = new FormData();
      formData.append('file', value.srcElement.files[0], value.srcElement.files[0].name);
      this.produtoService.upload(formData, 0).subscribe(res => {
        this.imagem = res.link;
      });
    }
  }

  salvar(produto: Produto) {
    //produto.imagem = this.imagem;
    if (produto._id) {
      this.produtoService.alterar(produto)
        .subscribe((orderId: string) => {
          this.router.navigate(['/adm/produto']);
        });
    } else {
      this.produtoService.salvar(produto)
        .subscribe((orderId: string) => {
          this.router.navigate(['/adm/produto']);
        });
    }
  }

}
