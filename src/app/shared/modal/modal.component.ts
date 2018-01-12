import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() showModal: boolean;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() cancelLabel: string;
  @Input() positiveLabel: string;

  @Output('closed') closeEmitter: EventEmitter<ModalResult> = new EventEmitter<ModalResult>();
  @Output('loaded') loadedEmitter: EventEmitter<ModalComponent> = new EventEmitter<ModalComponent>();
  @Output() positiveLabelAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.loadedEmitter.next(this);
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.closeEmitter.next({
      action: ModalAction.POSITIVE
    });
  }

  positiveAction() {
    this.positiveLabelAction.next(this);
    return false;
  }

  cancelAction() {
    this.showModal = false;
    this.closeEmitter.next({
      action: ModalAction.CANCEL
    });
    return false;
  }

}

export enum ModalAction { POSITIVE, CANCEL }

export interface ModalResult {
  action: ModalAction;
}
