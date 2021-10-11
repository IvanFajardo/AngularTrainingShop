import { ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromActions from '../actions';

// console.log all actions
export function logoutMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === fromActions.CLEAR_USER_STATE)
      return reducer(undefined, action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [logoutMetaReducer];
