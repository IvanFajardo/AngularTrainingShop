import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})
export class ConfirmationPageComponent implements OnInit {
  cartState: any;
  sTotal: number = 0;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select((state: any) => state.cart)
      .subscribe((result: any) => {
        this.cartState = result;
      });

    this.sTotal = this.sumTotal(this.cartState, 'price');
  }

  sumTotal(cart: any, prop: any) {
    return cart.reduce(function (a: any, b: any) {
      return a + b[prop];
    }, 0);
  }

  doSubmit() {}

  doBack() {
    this.router.navigate(['home']);
  }
}
