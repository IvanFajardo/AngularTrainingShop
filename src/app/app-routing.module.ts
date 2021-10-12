import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Main Components/login-page/login-page.component';
import { HomePageComponent } from './Main Components/home-page/home-page.component';
import { ConfirmationPageComponent } from './Main Components/confirmation-page/confirmation-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationPageComponent, //ConfirmationPage Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
