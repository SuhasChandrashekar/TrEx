import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username:String
  bookings:Booking[]
  editBooking: Booking
  queryMailString:String;
  booking:Booking;
  value:any;
  constructor(private bookingService:BookingService,private router:Router) { }

  //Implemented NgOnInit
  ngOnInit() {
    if(sessionStorage.getItem('currentUser')===null){
      this.router.navigateByUrl('login');
    }
    let user=JSON.parse(sessionStorage.getItem('currentUser'));
    this.username=user.username;
    this.get_Bookings();
   
  }

  //Below Function is to get all the booking from the server side
  get_Bookings():void{
    this.bookingService.getBookings().subscribe(bookings =>{
      this.bookings = bookings;
      this.queryMailString=this.username;
      console.log("bookings data"+this.bookings);
  })
}

//Below Function is to edit the the ticket value and cal the tickect price
edit(booking) {
  this.booking=booking;
  this.value =this.booking.totalBookingPrice as any/(this.booking.ticketsBooked as any);
  this.editBooking = booking;
}

//Below Function is to update the Ticket booking price in the data base
update() {
  this.editBooking.totalBookingPrice=(this.editBooking.ticketsBooked as any*this.value);
  if (this.editBooking) {
    this.bookingService.updateBooking(this.editBooking).subscribe(booking => {
      const indexx = booking ? this.bookings.findIndex(b => b._id === booking._id) : -1
      if (indexx > -1) {
        this.bookings[indexx] = booking
      }
    })
    this.editBooking = undefined
  }
}

//Below Function is to delete the booking data from the database
delete(booking: Booking): void {

  this.bookings = this.bookings.filter(b => b !== booking)
  this.bookingService.deleteBooking(booking._id).subscribe()
}

}
