import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/selectors';
import * as fromActions from '../../store/actions';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input()
  cartSubscription!: Subscription;
  cartState: Product[] = [];

  bsModalRef!: BsModalRef;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.cartSubscription = this.store
      .select((state: any) => state.cart)
      .subscribe((data: any) => {
        this.cartState = data.filter((product: Product) => product.qty > 0);
      });
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
  }

  //array of objects helper
  //finds the sum of a property of an object
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

  //clears the user and cart state and navigates to login
  logout() {
    this.store.dispatch(fromActions.CLEAR_USER_STATE());
    this.router.navigate(['login']);
  }
}
