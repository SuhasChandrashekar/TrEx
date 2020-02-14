import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
currentUser = sessionStorage.getItem('currentUser');


constructor(private router: Router) { }

  ngOnInit() {


  }


  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    location.href="";
    let url="login";
    this.router.navigateByUrl(url).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
  })
}

}
