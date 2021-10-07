import * as fromUsers from './user.reducers';
import * as fromProducts from './product.reducers';
import * as fromCart from './cart.reducers';

export const reducers = {
  userState: fromUsers.userReducer,
  products: fromProducts.productReducer,
  cart: fromCart.cartReducer,
};
