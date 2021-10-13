import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { Cart } from 'src/app/models/Cart';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  getProducts,
  updateProducts,
  sortProducts,
} from 'src/app/store/actions/product.actions';
import {
  addToCart,
  deleteFromCart,
  updateCart,
  sortCart,
} from 'src/app/store/actions/cart.actions';
import db from '../../../../db.json';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  prodState: any;
  cartState: any;
  prodSubscription?: Subscription;
  cartSubscription?: Subscription;

  constructor(private router: Router, private store: Store) {
    // Places the products state in prodState
    this.prodSubscription = this.store
      .select((state: any) => state.products)
      .subscribe((result: any) => {
        this.prodState = result;
      });

    // Places the cart state in cartState
    this.cartSubscription = this.store
      .select((state: any) => state.cart)
      .subscribe((result: any) => {
        this.cartState = result;
      });
  }

  ngOnInit(): void {
    //Get the products from db.json
    this.store.dispatch(
      getProducts({
        payload: db.products,
      })
    );
  }

  ngOnDestroy(): void {
    this.prodSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  addToCart(id: number, qty: number) {
    //Variable declarations to retrieve the values in prodVal and cartVal given the id of the product
    let prodVal = this.prodState.find((x: { id: number }) => x.id === id);
    let cartVal = this.cartState.find((x: { id: number }) => x.id === id);

    if (qty <= 0) return;

    //Condition that if the id is existing in the cart, adds the quantity to the cart.
    if (cartVal) {
      this.store.dispatch(
        updateCart({
          payload: {
            id: cartVal.id,
            title: cartVal.title,
            qty: +cartVal.qty + +qty,
            price: prodVal.price * (+cartVal.qty + +qty),
          },
        })
      );

      // Sorts the cart state by id
      this.store.dispatch(
        sortCart({
          payload: this.cartState,
        })
      );
    } else {
      //else, adds the entire product if its not in the cart.
      this.store.dispatch(
        addToCart({
          payload: {
            id: prodVal.id,
            title: prodVal.title,
            qty: qty,
            price: prodVal.price * qty,
          },
        })
      );

      // Sorts the cart state by id
      this.store.dispatch(
        sortCart({
          payload: this.cartState,
        })
      );
    }
  }

  //--------------------------------------------------------------------------------------------

  reduceFromCart(index: number) {
    let prodVal = this.prodState.find((x: { id: number }) => x.id === index);
    let cartVal = this.cartState.find((x: { id: number }) => x.id === index);

    console.log(this.cartState, cartVal);

    // Updates the cart to reduce the quantity and recalculate price
    if (cartVal.qty === 1) {
      this.store.dispatch(
        deleteFromCart({
          payload: {
            id: cartVal.id,
            title: cartVal.title,
            qty: cartVal.qty,
            price: cartVal.price,
          },
        })
      );
    } else {
      this.store.dispatch(
        updateCart({
          payload: {
            id: cartVal.id,
            title: cartVal.title,
            qty: cartVal.qty - 1,
            price: prodVal.price * (cartVal.qty - 1),
          },
        })
      );
    }
    // Sorts the cart state by id
    this.store.dispatch(
      sortCart({
        payload: this.cartState,
      })
    );
  }

  removeFromCart(index:number) {
    let cartVal = this.cartState.find((x: { id: number }) => x.id === index);
    this.store.dispatch(
      deleteFromCart({
        payload: {
          id: cartVal.id,
          title: cartVal.title,
          qty: cartVal.qty,
          price: cartVal.price,
        },
      })
    );
  }

  checkout(): void {
    this.router.navigate(['confirmation']);
  }
}
