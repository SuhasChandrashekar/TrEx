import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
@Component({
  selector: 'app-trexlanding',
  templateUrl: './trexlanding.component.html',
  styleUrls: ['./trexlanding.component.scss']
})
export class TrexlandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.animateLogo();
  }
  animateLogo(){
    let elemen = document.getElementById("animeContainer");
    var options = {
     strings: ['TrEx.', 'Travel.Experience. ','TrEx - Your Travel Guide.'],
     typeSpeed: 20,
   };
   var typed = new Typed('#animeContainerrr', options);
  }
  HideContainer1(){
   document.getElementById("container1").style.display ="none";
  }
}
