import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import db from '../../../../db.json';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/selectors/selectors';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users!: User[];
  user$: Observable<User | null>;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.user$ = this.store.select(fromSelectors.getUserSelector);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.users = db.users;
  }

  navigateTo(): void {
    this.router.navigate(['home']);
  }

  validateUser(form: FormGroup): null {
    let user: User | null;
    user = this.users.find((x) => x.username === form.value.username) || null;
    if (!user) {
      alert('Username does not exist.');
      return null;
    }
    if (user?.password == form.value.password) {
      this.store.dispatch(fromActions.SAVE_USER_STATE({ user: user as User }));
      console.log('logged in!');
      this.navigateTo();
    } else {
      alert('Password is incorrect.');
    }
    return null;
  }
}
