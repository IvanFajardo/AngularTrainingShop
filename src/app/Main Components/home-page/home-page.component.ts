import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { Router } from '@angular/router';
import { getProducts } from 'src/app/store/actions/product.actions';
import { addToCart, updateCart } from 'src/app/store/actions/cart.actions';
import db from '../../../../db.json';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  prodState: any;
  cartState: any;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      getProducts({
        payload: db.products,
      })
    );

    this.store
      .select((state: any) => state.products)
      .subscribe((result: any) => {
        this.prodState = result;
      });
  }

  addToCart(id: number, qty: number) {
    this.store
      .select((state: any) => state.cart)
      .subscribe((result: any) => {
        this.cartState = result;
      });

    let cartVal = this.cartState.find((x: { id: number }) => x.id === id);
    if (cartVal) {
      this.store.dispatch(
        updateCart({
          payload: {
            id: cartVal.id,
            title: cartVal.title,
            qty: cartVal.qty + 1,
            price: cartVal.price,
          },
        })
      );
    } else {
      let val = this.prodState.find((x: { id: number }) => x.id === id);
      this.store.dispatch(
        addToCart({
          payload: {
            id: val.id,
            title: val.title,
            qty: qty,
            price: val.price,
          },
        })
      );
    }
  }

  reduceFromCart(index: number, quantity: number) {}

  checkout(): void {
    this.router.navigate(['confirmation']);
  }
}
