import { Component, OnInit, HostListener, Inject  } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

import { Principal } from '../model/principal.model';
import { PrincipalService } from './principal.service';
import { SITE } from '../app.api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  principal: Principal;

  public navIsFixed: boolean = false;

  constructor(private principalService: PrincipalService,
             @Inject(DOCUMENT) private document: Document) { }


  ngOnInit() {
    this.principalService.getPrincipal()
      .subscribe(principal => {
        this.principal = principal;
      });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && number < 10) {
      this.navIsFixed = false;
    }
  }

}
