import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import {
  getProducts,
  updateProducts,
  sortProducts,
} from '../actions/product.actions';

export const initialState: ReadonlyArray<Product> = [];

export const _productReducer = createReducer(
  initialState,
  on(getProducts, (state: any, { payload }) => {
    return [...payload];
  }),
  on(updateProducts, (state: any, { payload }) => {
    return [
      ...state.filter((product: any) => product.id !== payload.id),
      payload,
    ];
  }),
  on(sortProducts, (state: any, { payload }) => {
    return state.slice().sort(function (a: any, b: any) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  })
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
