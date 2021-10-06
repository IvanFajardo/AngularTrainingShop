import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import * as fromActions from '../actions';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export const _userReducer = createReducer(
  initialState,
  on(fromActions.SAVE_USER_STATE, (state, { user }) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
      ...state,
      user,
    };
  }),
  on(fromActions.CLEAR_USER_STATE, (state) => {
    sessionStorage.removeItem('user')
    return {
      ...state,
      user:null
    }
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}

export const getUser = (state: any, action: any) => {
  return state.user;
};
