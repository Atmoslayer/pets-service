import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from "./app.component";
import {AuthGuard} from "./login/login.auth-guard";
import {PetsComponent} from "./pets/pets.component";
import {RegistrationComponent} from "./registration/registration.component";


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: '', component: PetsComponent, canActivate: [AuthGuard],  data:{requiresLogin: true}
  },
  {
    path: '**', component: PetsComponent, canActivate: [AuthGuard],  data:{requiresLogin: true}
  }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
