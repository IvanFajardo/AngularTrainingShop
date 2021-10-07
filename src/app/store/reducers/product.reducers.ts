import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { getProducts } from '../actions/product.actions';

export const initialState: ReadonlyArray<Product> = [];

export const productReducer = createReducer(
  initialState,
  on(getProducts, (state: any, { payload }) => {
    return [...payload];
  })
);
