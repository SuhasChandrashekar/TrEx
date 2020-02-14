import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Connect } from '../models/connect';
@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  public rootURL= "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getConnect(): Observable<Connect[]> {
    return this.http.get<Connect[]>(this.rootURL+"/connects");
  }
  addConnect(connect: Connect): Observable<Connect> {
    return this.http
      .post<Connect>(this.rootURL+"/connects", connect)
  }
}
