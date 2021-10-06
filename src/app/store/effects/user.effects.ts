import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as fromActions from '../actions'

@Injectable() 
export class UserEffects {
  //logout
  constructor(private action$: Actions){}
}