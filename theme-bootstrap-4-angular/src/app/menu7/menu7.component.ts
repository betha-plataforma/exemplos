import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu7',
  templateUrl: './menu7.component.html',
})

export class Menu7Component implements OnInit {
  @ViewChild('registerModal') private registerModal: any;
  closeResult = '';
  activeId:number = 1;
  model = {

  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal(): void {
    this.modalService.open(this.registerModal, { animation: true });
  }

}

