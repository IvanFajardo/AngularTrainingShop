import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/models/Cart';

export const GET_CART = '[Cart] Get Cart';

export const ADD_TO_CART = '[Cart] Add to Cart';

export const UPDATE_CART = '[Cart] Update Cart';

export const updateCart = createAction(UPDATE_CART, props<{ payload: Cart }>());

export const getCart = createAction(GET_CART, props<{ payload: Cart[] }>());

export const addToCart = createAction(ADD_TO_CART, props<{ payload: Cart }>());
