import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputComponent} from './input/input.component';
import {RadioComponent} from './radio/radio.component';
import {RatingComponent} from './rating/rating.component';
import {LinkImgComponent} from './link-img/link-img.component';
import {DialogLinkImgComponent} from './link-img/dialog-link-img/dialog-link-img.component';
import {ModalComponent} from './modal/modal.component';



@NgModule({
    declarations: [InputComponent, 
                   RadioComponent,
                   RatingComponent,
                   LinkImgComponent,
                   DialogLinkImgComponent,
                   ModalComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
              DialogLinkImgComponent, LinkImgComponent, ModalComponent,
              CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
            ]
        }
    }

}