import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/selectors';
import * as fromActions from '../../store/actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input()
  cartItems: number = 0;

  constructor(private store: Store<AppState>, private router: Router) {}

  openCart() {
    //opens the cart modal
  }

  logout() {
    this.store.dispatch(fromActions.CLEAR_USER_STATE())
    this.router.navigate(['login'])
  }
}
