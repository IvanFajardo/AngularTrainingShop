import { createSelector } from "@ngrx/store";
import * as fromUsers from "../reducers/user.reducers";
import * as fromSelectors from './selectors' 


export const getUserSelector = createSelector(fromSelectors.getAppState,(state)=> state.user.user)

