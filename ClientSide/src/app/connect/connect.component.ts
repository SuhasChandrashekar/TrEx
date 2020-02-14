import { Component, OnInit } from '@angular/core';
import { ConnectService} from '../services/connect.service';
import { Connect } from '../models/connect';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  connect: Connect[];
  actualUser: any = JSON.parse(sessionStorage.getItem('currentUser')).firstName;
  constructor(private connectServies : ConnectService) { }

  ngOnInit() {
    this.connectServies.getConnect().subscribe(connect =>{
      this.connect = connect;
      })
  }
  sendMsg(){
    let name =JSON.parse(sessionStorage.getItem('currentUser')).firstName;
    let username = JSON.parse(sessionStorage.getItem('currentUser')).username;
    let message= (<HTMLInputElement>document.getElementById('userMsg')).value;
    let city = "";
    let date ="";
    const newMsg: Connect = { name, username ,message,city,date } as Connect
    this.connectServies.addConnect(newMsg).subscribe(connects => this.connect.push(connects))
  }
}
