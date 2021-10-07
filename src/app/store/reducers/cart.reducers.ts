import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/models/Cart';
import { getCart, addToCart, updateCart } from '../actions/cart.actions';

export const initialState: ReadonlyArray<Cart> = [];

export const cartReducer = createReducer(
  initialState,
  on(getCart, (state: any, { payload }) => {
    return [...payload];
  }),

  on(addToCart, (state: any, { payload }) => {
    return [...state, payload];
  }),

  on(updateCart, (state: any, { payload }) => {
    return [...state.filter((user: any) => user.id !== payload.id), payload];
  })
);
