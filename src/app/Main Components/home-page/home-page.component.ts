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
    let prodVal = this.prodState.find(
      (x: { id: number }) => x.id === this.cartState[index].id
    );
    // Updates the cart to reduce the quantity and recalculate price
    this.store.dispatch(
      updateCart({
        payload: {
          id: this.cartState[index].id,
          title: this.cartState[index].title,
          qty: this.cartState[index].qty - 1,
          price: prodVal.price * (this.cartState[index].qty - 1),
        },
      })
    );

    // Sorts the cart state by id
    this.store.dispatch(
      sortCart({
        payload: this.cartState,
      })
    );

    //If reduced to the point where the quantity reaches 0, its deleted
    if (this.cartState[index].qty == 0) {
      this.store.dispatch(
        deleteFromCart({
          payload: {
            id: this.cartState[index].id,
            title: this.cartState[index].title,
            qty: this.cartState[index].qty,
            price: this.cartState[index].price,
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

  checkout(): void {
    this.router.navigate(['confirmation']);
  }
}
