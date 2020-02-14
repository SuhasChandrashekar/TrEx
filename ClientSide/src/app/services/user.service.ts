import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public rootURL= "http://localhost:3000";

  constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.rootURL + '/users');
    }

    getById(_id: string) {
        return this.http.get(this.rootURL + '/users/' + _id);
    }

    create(user: any) {
        return this.http.post(this.rootURL + '/users/register', user)
        .pipe(map((response: Response) => {
            return response;
          }));
    }

    update(user: User) {
        return this.http.put(this.rootURL + '/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(this.rootURL + '/users/' + _id);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.rootURL+"/users");
      }
      
      updateUser(user: User): Observable<User> {
        return this.http
          .put<User>(this.rootURL+`/users/${user._id}`, user);
      }
}
