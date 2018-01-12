import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OptionImgComponent } from '../link-img.component';

@Component({
  selector: 'app-dialog-link-img',
  templateUrl: './dialog-link-img.component.html',
  styleUrls: ['./dialog-link-img.component.css']
})
export class DialogLinkImgComponent implements OnInit {

  @Input()
  imagens: any[];

  @Input()
  urlList: string;

  @Input()
  urlDelete: string;

  @Output()
  onSelect = new EventEmitter<string>();

  constructor(private http: Http) { }

  ngOnInit() {
  }

  optionsList: OptionImgComponent = {
    buttonAdd: true,
    buttonBrowse: false,
    buttonRemove: true,
    buttonUpload: false
  }



  updateList(id: any) {
    console.log(id);
    for (var i = 0; i < this.imagens.length; i++) {
      if (this.imagens[i].id == id) {
        this.imagens.splice(i, 1);
        break;
      }
    }
  }

  select(imagem: any, btn: any) {
    console.log(imagem);
    this.onSelect.emit(imagem);
    btn.click();
  }

}
