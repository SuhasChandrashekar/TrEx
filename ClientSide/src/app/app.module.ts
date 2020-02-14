import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Resolver } from '../app/resolver';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrexlandingComponent } from './trexlanding/trexlanding.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptorProvider } from './_helpers/jwt.interceptor';
import { ErrorInterceptorProvider } from './_helpers/error.interceptor';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import {AtomSpinnerModule} from 'angular-epic-spinners'
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './footer/footer.component';
import { CircularnavbarComponent } from './circularnavbar/circularnavbar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TediffPipe } from './home/tediff.pipe';
import { BookingComponent } from './booking/booking.component';
import { ConnectComponent } from './connect/connect.component';
import { SearchPipePipe } from './home/search-pipe.pipe';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { UserDetailsComponent } from './user-details/user-details.component';
import { DetailsPipe } from './user-details/details.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfilePipePipe } from './user-profile/profile-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TrexlandingComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    TediffPipe,
    SearchPipePipe,
    BookingComponent,
    ConnectComponent,
    FooterComponent,
    CircularnavbarComponent,
    AboutUsComponent,
    UserProfileComponent,
    ProfilePipePipe,
    UserDetailsComponent,
    DetailsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    AtomSpinnerModule,
    ShareButtonsModule
  ],
  providers: [
  Resolver,
    AlertService,
    AuthenticationService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
