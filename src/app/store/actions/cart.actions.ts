import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const GET_CART = '[Cart] Get Cart';

export const ADD_TO_CART = '[Cart] Add to Cart';

export const UPDATE_CART = '[Cart] Update Cart';

export const DELETE_FROM_CART = '[Cart] Delete from Cart';

export const SORT_CART = '[Cart] Sort Cart';

export const updateCart = createAction(UPDATE_CART, props<{ payload: Product }>());

export const deleteFromCart = createAction(
  DELETE_FROM_CART,
  props<{ payload: Product }>()
);

export const getCart = createAction(GET_CART, props<{ payload: Product[] }>());

export const addToCart = createAction(ADD_TO_CART, props<{ payload: Product }>());

export const sortCart = createAction(SORT_CART, props<{ payload: Product[] }>());
