import { Injectable } from '@angular/core';
import { Entity } from '../models/entity';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntityService {
  public rootURL= "http://localhost:3000";

  constructor(public http : HttpClient) { }
  private messageSource = new BehaviorSubject('default message');
  //public messageSource: BehaviorSubject<Entity> = new BehaviorSubject<Entity>();
  currentMessage = this.messageSource.asObservable();



  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.rootURL+"/entities");
  }

  getSearchEntities(): Observable<Entity[]> {
    console.log("Suhas entity.service.ts");
    return this.http.get<Entity[]>(this.rootURL+"/entities/searchEntities");
  }
}
