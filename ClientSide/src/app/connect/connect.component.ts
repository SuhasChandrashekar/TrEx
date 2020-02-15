import { Component, OnInit } from '@angular/core';
import { ConnectService} from '../services/connect.service';
import { Connect } from '../models/connect';
import { Router } from "@angular/router";
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  connect: Connect[];
  actualUser: any;

  constructor(private connectServies : ConnectService,private router: Router) {
    //checking whether the state is logged in
    if(sessionStorage.getItem('currentUser')!= null){
    this.actualUser = JSON.parse(sessionStorage.getItem('currentUser')).firstName;
    }
    else{
      var url ="login";
      //redirecting to different URL
      this.router.navigateByUrl(url).then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
    })
    }
  }

  ngOnInit() {
    //getting all the connect chat messages
    this.connectServies.getConnect().subscribe(connect =>{
      this.connect = connect;
      })

  }
  // Sending the message  and storing it in repository
  sendMsg(){
    let name =JSON.parse(sessionStorage.getItem('currentUser')).firstName;
    let username = JSON.parse(sessionStorage.getItem('currentUser')).username;
    let message= (<HTMLInputElement>document.getElementById('userMsg')).value;
    let city = "";
    let date =Date.now.toString();
    const newMsg: Connect = { name, username ,message,city,date } as Connect
    this.connectServies.addConnect(newMsg).subscribe(connects => this.connect.push(connects))
  }
}
