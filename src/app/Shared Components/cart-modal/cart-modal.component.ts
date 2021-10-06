import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
})
export class CartModalComponent implements OnInit {
  @Input()
  cart!: any[]
  @Output()
  add: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  reduce: EventEmitter<number> = new EventEmitter<number>();
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  doCheckout() {
    //checkout
  }

  doClose() {
    this.modalService.hide();
  }

  addQuantity(index: number) {
    
  }

  reduceQuantity(index: number) {

  }
}
