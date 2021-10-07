import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const GET_PRODUCTS = '[Product] Get Products';

export const getProducts = createAction(
  GET_PRODUCTS,
  props<{ payload: Product[] }>()
);
