import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ConfiguracaoService } from '../adm/adm-configuracao/configuracao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  @ViewChild('container')
  private container: ElementRef;

  constructor(private confService: ConfiguracaoService) { }

  conf: any;

  ngOnInit() {
    this.confService.getConfiguracao()
      .subscribe(conf =>{
        this.conf = conf;
      });
  }

  onScroll(){
    console.log("this.container");
  }

}
