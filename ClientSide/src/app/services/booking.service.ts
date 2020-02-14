import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Booking } from '../models/booking';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public rootURL= "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.rootURL+"/bookings");
  }
  addBooking(booking: Booking): Observable<Booking> {
    return this.http
      .post<Booking>(this.rootURL+"/bookings", booking)
  }
  updateBooking(booking: Booking): Observable<Booking> {
    return this.http
      .put<Booking>(this.rootURL+`/bookings/${booking._id}`, booking);
  }
  deleteBooking(id: number): Observable<{}> {
    const url =this.rootURL+ `/bookings/${id}`;
    return this.http
      .delete(url)
  }
}
