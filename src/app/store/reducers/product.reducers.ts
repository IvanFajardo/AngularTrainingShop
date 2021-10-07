import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { getProducts } from '../actions/product.actions';

export const initialState: ReadonlyArray<Product> = [];

export const _productReducer = createReducer(
  initialState,
  on(getProducts, (state: any, { payload }) => {
    return [...payload];
  })
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
