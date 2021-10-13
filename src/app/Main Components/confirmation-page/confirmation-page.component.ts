import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  getProducts,
  updateProducts,
  sortProducts,
} from 'src/app/store/actions/product.actions';
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {
  cartState: any;
  prodState: any;
  prodSubscription?: Subscription;
  cartSubscription?: Subscription;
  sTotal: number = 0;

  constructor(private router: Router, private store: Store) {
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
    this.sTotal = this.sumTotal(this.cartState, 'price');
  }

  ngOnDestroy(): void {
    this.prodSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  sumTotal(cart: any, prop: any) {
    return cart.reduce(function (a: any, b: any) {
      return a + b[prop];
    }, 0);
  }

  doSubmit() {
    for (var i = 0; i < this.cartState.length; i++) {
      let prodVal = this.prodState.find(
        (x: { id: number }) => x.id === this.cartState[i].id
      );
      this.store.dispatch(
        updateProducts({
          payload: {
            id: prodVal.id,
            title: prodVal.title,
            qty: prodVal.qty - this.cartState[i].qty,
            price: prodVal.price,
            img: prodVal.img,
          },
        })
      );
    }

    //Sorts prodState by id
    this.store.dispatch(
      sortProducts({
        payload: this.prodState,
      })
    );
  }

  doBack() {
    this.router.navigate(['home']);
  }
}
