import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() onAddProduct: EventEmitter<any> = new EventEmitter();
  custQty: number = 1;
  constructor() {}

  ngOnInit(): void {}

  addToCart(id: number, qty: number) {
    this.onAddProduct.emit({ id: id, qty: qty });
  }
}
