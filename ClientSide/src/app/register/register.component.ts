import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model: any = {};
    loading = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

    register() {
      this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  console.log("Register", data);
                  this.alertService.success('Registration successful', true);
                  console.log('Registration successful');
                  this.router.navigateByUrl('login');
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
