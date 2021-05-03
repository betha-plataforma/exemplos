import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listagem',
  templateUrl: './menu4.component.html',
  styleUrls: ['./menu4.component.scss']
})
export class Menu4Component implements OnInit {
  @ViewChild('registerModal') private registerModal: any;
  closeResult = '';
  activeId:number = 1;
  model = {

  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal(): void {
    this.modalService.open(this.registerModal, { size: 'lg', animation: true });
  }

}
