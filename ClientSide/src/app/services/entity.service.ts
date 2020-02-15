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


//to pass the message from one component to other component
  changeMessage(message: any) {
    this.messageSource.next(message)
  }
// to get all entities
  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.rootURL+"/entities");
  }
// to search for all entities
  getSearchEntities(): Observable<Entity[]> {
    console.log("Suhas entity.service.ts");
    return this.http.get<Entity[]>(this.rootURL+"/entities/searchEntities");
  }
   // to update all the the entity
  updateEntityCount(entities: Entity): Observable<Entity> {
    return this.http
      .put<Entity>(this.rootURL+`/entities/${entities._id}`, entities);
  }

  // to send a request to service to TELEGRAM API to poast the data on channel
  sendTelegramMsg(msg){
    // 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('POST', 'https://api.telegram.org/bot1015281897:AAEe5lroru6PavpMRXUkUraN05n8YctMmgA/sendMessage?chat_id=-209794554&text='+ msg);

// 3. Send the request over the network
xhr.send();
}
}
