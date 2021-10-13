import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/selectors/selectors';
import * as fromActions from '../../store/actions';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

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

  @Output()
  add: EventEmitter<number> = new EventEmitter<number>()
  @Output()
  reduce: EventEmitter<number> = new EventEmitter<number>()
  @Output()
  remove: EventEmitter<number> = new EventEmitter<number>()
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.cartSubscription = this.store
      .select((state: any) => state.cart)
      .subscribe((data: any) => {
        this.cartState = data.filter((product: Product) => product.qty > 0);
        console.log(this.cartState);
        
      });
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
    this.bsModalRef.content.add?.unsubscribe();
    this.bsModalRef.content.reduce?.unsubscribe();
    this.bsModalRef.content.remove?.unsubscribe();
  }

  //array of objects helper
  //finds the sum of a property of an object
  sum(arr: any[], key: string | number) {
    return arr.reduce((a, b) => a + (b[key] || 0), 0);
  }

  openCart() {
    //opens the cart modal
    this.bsModalRef = this.modalService.show(CartModalComponent, {
      animated: true,
      class:'modal-lg',
      initialState:{
        cart:this.cartState
      }
    });

    this.bsModalRef.content.add.subscribe((res:any) => this.add.emit(res))
    this.bsModalRef.content.reduce.subscribe((res:any) => this.reduce.emit(res))
    this.bsModalRef.content.remove.subscribe((res:any) => this.remove.emit(res))
    this.bsModalRef.content.checkout.subscribe((res:any) => this.router.navigate(['checkout']))
  }

  //clears the user and cart state and navigates to login
  logout() {
    this.store.dispatch(fromActions.clearUserState());
    this.router.navigate(['login']);
  }
}
