import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import { TrexlandingComponent } from './trexlanding/trexlanding.component';
import {  BookingComponent} from './booking/booking.component';
import { ConnectComponent } from './connect/connect.component';
import { Resolver } from '../app/resolver';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {path:"register", component:RegisterComponent},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path: "",   component:TrexlandingComponent},
  {path: "connect",   component:ConnectComponent},
  {path: "booking",   component:BookingComponent},
  {path:"about", component:AboutUsComponent },
  {path: "profile", component:UserProfileComponent},
  {path: "details", component:UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
