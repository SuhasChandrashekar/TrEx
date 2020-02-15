import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  username:String
  users:User[]
  editUser: User
  queryUserString:String;
  user:User;
  constructor(private userService:UserService) { }

  ngOnInit() {
    let user=JSON.parse(sessionStorage.getItem('currentUser'));
    this.username=user.username;
    this.get_Users();
   
  }

  get_Users():void{
    this.userService.getUsers().subscribe(users =>{
      this.users = users;
      this.queryUserString=this.username;
      console.log("Users data"+this.users);
  })
}

edit(user) {
  this.editUser = user;
}

update() {
  if (this.editUser) {
    this.userService.updateUser(this.editUser).subscribe(user => {
      const indexx = user ? this.users.findIndex(u => u._id === user._id) : -1
      if (indexx > -1) {
        this.users[indexx] = user
      }
    })
    this.editUser = undefined;
  }
}

}
