import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/User";

export const SAVE_USER_STATE = createAction('[User] Save user state', props<{user: User}>())