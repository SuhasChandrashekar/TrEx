import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public rootURL= "http://localhost:3000";
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.rootURL + '/users/authenticate', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                console.log();
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}
