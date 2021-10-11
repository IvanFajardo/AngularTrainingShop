import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const GET_PRODUCTS = '[Product] Get Products';
export const UPDATE_PRODUCT = '[Product] Update Product';
export const SORT_PRODUCTS = '[Product] Sort Products';

export const getProducts = createAction(
  GET_PRODUCTS,
  props<{ payload: Product[] }>()
);

export const updateProducts = createAction(
  UPDATE_PRODUCT,
  props<{ payload: Product }>()
);

export const sortProducts = createAction(
  SORT_PRODUCTS,
  props<{ payload: Product[] }>()
);
