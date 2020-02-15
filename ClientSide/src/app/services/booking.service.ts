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
// to get all bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.rootURL+"/bookings");
  }
  // to add bookings into the list
  addBooking(booking: Booking): Observable<Booking> {
    return this.http
      .post<Booking>(this.rootURL+"/bookings", booking)
  }
  // to update the  booking list
  updateBooking(booking: Booking): Observable<Booking> {
    return this.http
      .put<Booking>(this.rootURL+`/bookings/${booking._id}`, booking);
  }S
  // to delete the bookings
  deleteBooking(id: number): Observable<{}> {
    const url =this.rootURL+ `/bookings/${id}`;
    return this.http
      .delete(url)
  }
}
