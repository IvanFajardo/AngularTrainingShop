import { createFeatureSelector } from '@ngrx/store'
import * as fromUsers from '../reducers/user.reducers'

export interface AppState {
  user: fromUsers.UserState
}

export interface State {
  appState: AppState
}

export const getAppState = createFeatureSelector<AppState>('appState')

