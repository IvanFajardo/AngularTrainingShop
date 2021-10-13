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
  @Output()
  checkout: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  remove: EventEmitter<number> = new EventEmitter<number>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  //navigates to checkout page
  doCheckout() {
    //checkout
    this.checkout.emit()
  }

  //closes the modal
  doClose() {
    this.modalService.hide();
  }

  //adds 1 to quantity of product
  //index:number = id of product
  addQuantity(index: number) {
    this.add.emit(index)
    this.cart = this.cart.map(data => data.id === index ? {...data, qty: data.qty + 1} : data)
  }

  //reduces quantity of product by 1
  //index:number = id of product
  reduceQuantity(index: number) {
    this.reduce.emit(index)
    this.cart = this.cart.map(data => data.id === index ? {...data, qty: data.qty - 1} : data)
  }

  //deletes product from cart
  removeFromCart(index: number) {
    this.remove.emit(index)
    this.cart = this.cart.filter(data => data.id !== index)

  }
}
