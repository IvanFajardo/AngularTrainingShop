import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/selectors';
import * as fromActions from '../../store/actions'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input()
  cartItems: number = 15;
  cart = [
    // {
    //   item:"H&M Basics: Slim-fit White T-shirt",
    //   qty:1,
    //   price:100,
    //   img:'assets/img/white-tshirt.jpg'
    // },
    // {
    //   item:"H&M Basics: Slim-fit Black T-shirt",
    //   qty:1,
    //   price:50,
    //   img:'assets/img/black-tshirt.jpg'
    // },
  ]
  bsModalRef!: BsModalRef;
  constructor(private store: Store<AppState>, private router: Router, private modalService: BsModalService) {}

  ngOnInit() {
    // this.cartItems = this.sum(this.cart, 'qty')
  }

  sum(arr: any[], key: string | number) {
    return arr.reduce((a, b) => a + (b[key] || 0), 0);
  }

  openCart() {
    //opens the cart modal
    // this.bsModalRef = this.modalService.show(CartModalComponent, {
    //   animated: true,
    //   class:'modal-lg',
    //   initialState:{
    //     cart:this.cart
    //   }
    // });
  }

  logout() {
    this.store.dispatch(fromActions.CLEAR_USER_STATE())
    this.router.navigate(['login'])
  }
}
