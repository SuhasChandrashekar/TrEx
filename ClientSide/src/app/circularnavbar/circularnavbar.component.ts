import { Component, OnInit } from '@angular/core';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router } from "@angular/router";
@Component({
  selector: 'app-circularnavbar',
  templateUrl: './circularnavbar.component.html',
  styleUrls: ['./circularnavbar.component.scss']
})
export class CircularnavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");
bars.addEventListener("click", barClicked, false);
 function barClicked() {
  let bars = document.getElementById("nav-action");
  var nav = document.getElementById("nav");
  bars.classList.toggle('active');
  nav.classList.toggle('visible');
}
}


closenavhome() {

let url="home";
this.router.navigateByUrl(url).then(e => {
  if (e) {
    console.log("Navigation is successful!");
    location.href="";
  } else {
    console.log("Navigation has failed!");
  }
})
}



closenavSignIn() {

let url="login";
this.router.navigateByUrl(url).then(e => {
  if (e) {
    console.log("Navigation is successful!");
    location.href="";
  } else {
    console.log("Navigation has failed!");
  }
})
}

closenavbookings() {

  let url="profile";
  this.router.navigateByUrl(url).then(e => {
    if (e) {
      console.log("Navigation is successful!");
      location.href="";
    } else {
      console.log("Navigation has failed!");
    }
  })
  }
  closenavprofile() {

    let url="details";
    this.router.navigateByUrl(url).then(e => {
      if (e) {
        console.log("Navigation is successful!");
        location.href="";
      } else {
        console.log("Navigation has failed!");
      }
    })
    }

}
