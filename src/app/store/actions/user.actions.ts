import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/User";

export const SAVE_USER_STATE = '[User] Save user state'
export const CLEAR_USER_STATE = '[User] Clear user state'

export const saveUserState = createAction(SAVE_USER_STATE, props<{user: User}>())
export const clearUserState = createAction(CLEAR_USER_STATE)