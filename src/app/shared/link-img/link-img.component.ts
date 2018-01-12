import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-link-img',
  templateUrl: './link-img.component.html',
  styleUrls: ['./link-img.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinkImgComponent),
      multi: true
    }
  ]
})
export class LinkImgComponent implements OnInit, ControlValueAccessor {

  @Input()
  imagem: string;

  imagens: any[];

  onChange: any;

  @Input()
  urlUpload: string;

  @Input()
  urlDelete: string;

  @Input()
  urlList: string;

  @Input()
  id: string;

  @Input()
  fileName: string;

  @Output()
  onImagem = new EventEmitter<string>();

  @Output()
  onBeforeDelete = new EventEmitter<string>();

  @Output()
  onSelect = new EventEmitter();

  @Input()
  options: OptionImgComponent;


  constructor(private http: Http) { }

  ngOnInit() {
    this.getImagens();
  }

  getImagens() {
    if (this.urlList) {
      return this.http.get(this.urlList)
        .map(response => response.json())
        .subscribe(imagens => {
          this.imagens = imagens;
        });
    }
  }



  upload(value: any) {
    if (value) {
      const formData = new FormData();
      formData.append('file', value.srcElement.files[0], value.srcElement.files[0].name);
      const headers = new Headers();
      this.http.post(this.urlUpload,
        formData, new RequestOptions({ headers: headers }))
        .map((response) => response.json())
        .subscribe(res => {
          this.setImagem(res.link);
          this.onImagem.emit(this.imagem);
          this.getImagens();
        });
    }
  }

  setImagem(value: any) {
    this.imagem = value;
    this.onChange(this.imagem);
  }

  writeValue(obj: any): void {
    this.imagem = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }


  delete() {
    const headers = new Headers();
    this.http.delete(this.urlDelete, new RequestOptions({
      headers: headers,
      body: {
        id: this.id,
        src: this.fileName
      }
    }))
      .map((response) => response.json())
      .subscribe(res => {
        this.onBeforeDelete.emit(this.id);
        this.getImagens();
      });
  }

  select(imagem: any) {
    this.onSelect.emit(imagem);
  }

  imagemSelect(imagem: any) {
    this.setImagem(imagem);
    this.onImagem.emit(this.imagem);
  }

}

export interface OptionImgComponent {
  buttonUpload: boolean;
  buttonBrowse: boolean;
  buttonAdd: boolean;
  buttonRemove: boolean;
}
