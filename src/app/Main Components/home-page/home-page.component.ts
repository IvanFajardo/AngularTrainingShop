import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { Cart } from 'src/app/models/Cart';
import { Router } from '@angular/router';
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
export class HomePageComponent implements OnInit {
  prodState: any;
  cartState: any;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    //Get the products from db.json
    this.store.dispatch(
      getProducts({
        payload: db.products,
      })
    );

    // Places the products state in prodState
    this.store
      .select((state: any) => state.products)
      .subscribe((result: any) => {
        this.prodState = result;
      });
  }

  addToCart(id: number, qty: number) {
    // Places the cart state in cartState
    this.store
      .select((state: any) => state.cart)
      .subscribe((result: any) => {
        this.cartState = result;
      });

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
      // Places the cart state in cartState for sorting
      this.store
        .select((state: any) => state.cart)
        .subscribe((result: any) => {
          this.cartState = result;
        });
      // Sorts the cart state by id
      this.store.dispatch(
        sortCart({
          payload: this.cartState,
        })
      );

      //Updates products to subtract quantity
      this.store.dispatch(
        updateProducts({
          payload: {
            id: prodVal.id,
            title: prodVal.title,
            qty: prodVal.qty - qty,
            price: prodVal.price,
            img: prodVal.img,
          },
        })
      );

      // Sorts the product state by id
      this.store.dispatch(
        sortProducts({
          payload: this.prodState,
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

      //Updates products to subtract quantity
      this.store.dispatch(
        updateProducts({
          payload: {
            id: prodVal.id,
            title: prodVal.title,
            qty: prodVal.qty - qty,
            price: prodVal.price,
            img: prodVal.img,
          },
        })
      );

      //Sorts prodState by id
      this.store.dispatch(
        sortProducts({
          payload: this.prodState,
        })
      );
    }
  }

  //--------------------------------------------------------------------------------------------

  reduceFromCart(index: number) {
    // Places the cart state in cartState
    this.store
      .select((state: any) => state.cart)
      .subscribe((result: any) => {
        this.cartState = result;
      });

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

    // Places the cart state in cartState for sorting
    this.store
      .select((state: any) => state.cart)
      .subscribe((result: any) => {
        this.cartState = result;
      });

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
      // Places the cart state in cartState for sorting
      this.store
        .select((state: any) => state.cart)
        .subscribe((result: any) => {
          this.cartState = result;
        });

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
