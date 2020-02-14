import { Component, OnInit } from '@angular/core';
declare var particlesJS: any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
   
    particlesJS.load('particles-js', 'assets/Files/particles.json', null);
  }

}
