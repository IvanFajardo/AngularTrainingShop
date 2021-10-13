import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Main Components/login-page/login-page.component';
import { HomePageComponent } from './Main Components/home-page/home-page.component';
import { ProductCardComponent } from './Main Components/product-card/product-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import * as fromReducers from './store/reducers/reducers';
import { UserEffects } from './store/effects/user.effects';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './Shared Components/header/header.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { metaReducers } from './store/metareducers/logout.metareducer';
import { CartModalComponent } from './Shared Components/cart-modal/cart-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    HomePageComponent,
    ProductCardComponent,
    CartModalComponent
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
