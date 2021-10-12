import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ModalModule } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationPageComponent } from './Main Components/confirmation-page/confirmation-page.component';
import { HomePageComponent } from './Main Components/home-page/home-page.component';
import { LoginPageComponent } from './Main Components/login-page/login-page.component';
import { ProductCardComponent } from './Main Components/product-card/product-card.component';
import { HeaderComponent } from './Shared Components/header/header.component';
import { UserEffects } from './store/effects/user.effects';
import { metaReducers } from './store/metareducers/logout.metareducer';
import * as fromReducers from './store/reducers/reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    HomePageComponent,
    ProductCardComponent,
    ConfirmationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromReducers.reducers,  { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([UserEffects]),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
