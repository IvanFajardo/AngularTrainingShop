import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/selectors';
import * as fromActions from '../../store/actions'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input()
  cartItems: number = 0;
  cart = [
    {
      id:1,
      name:'H&M Basics: White Tee',
      price: 299,
      qty: 1,
      img: '/assets/img/whitetee.jpg'
    },
    {
      id:2,
      name:'H&M Basics: Black Tee',
      price: 350,
      qty: 1,
      img: '/assets/img/blacktee.jpg'
    },
    {
      id:2,
      name:'H&M Basics: Black Tee',
      price: 350,
      qty: 1,
      img: '/assets/img/blacktee.jpg'
    },
    {
      id:2,
      name:'H&M Basics: Black Tee',
      price: 350,
      qty: 1,
      img: '/assets/img/blacktee.jpg'
    },
    {
      id:2,
      name:'H&M Basics: Black Tee',
      price: 350,
      qty: 1,
      img: '/assets/img/blacktee.jpg'
    },
    {
      id:2,
      name:'H&M Basics: Black Tee',
      price: 350,
      qty: 1,
      img: '/assets/img/blacktee.jpg'
    },
  ]
  private bsModalRef!:BsModalRef
  constructor(private store: Store<AppState>, private router: Router, private modalService: BsModalService) {}

  openCart() {
    //opens the cart modal
    const initialState = {
      cart:this.cart
    }
    this.modalService.show(CartModalComponent, {
      initialState,
      class:'modal-lg'
    })
  }

  logout() {
    this.store.dispatch(fromActions.CLEAR_USER_STATE())
    this.router.navigate(['login'])
  }
}
