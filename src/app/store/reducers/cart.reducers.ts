import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/models/Cart';
import {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  sortCart,
} from '../actions/cart.actions';

export const initialState: ReadonlyArray<Cart> = [];

export const _cartReducer = createReducer(
  initialState,
  on(getCart, (state: any, { payload }) => {
    return [...payload];
  }),

  on(addToCart, (state: any, { payload }) => {
    return [...state, payload];
  }),

  on(updateCart, (state: any, { payload }) => {
    return [...state.filter((cart: any) => cart.id !== payload.id), payload];
  }),

  on(deleteFromCart, (state: any, { payload }) => {
    return [...state.filter((cart: any) => cart.id !== payload.id)];
  }),

  on(sortCart, (state: any, { payload }) => {
    return state.slice().sort(function (a: any, b: any) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  })
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
