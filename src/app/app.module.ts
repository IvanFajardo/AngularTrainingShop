import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Main Components/home-page/home-page.component';
import { productReducer } from './store/reducers/product.reducers';
import { ProductCardComponent } from './Main Components/product-card/product-card.component';
import { cartReducer } from './store/reducers/cart.reducers';

@NgModule({
  declarations: [AppComponent, HomePageComponent, ProductCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: productReducer, cart: cartReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
