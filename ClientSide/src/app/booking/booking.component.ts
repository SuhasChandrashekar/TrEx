import { Component, OnInit } from '@angular/core';
import { EntityService} from '../services/entity.service';
import { Entity } from '../models/entity';
import { Booking } from '../models/booking';
import { BookingService } from '../services/booking.service';
import reframe from 'reframe.js';
import { Router } from "@angular/router";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  message:any;
  model: any = {};
  tickets: Array<string> = [];
  bookedticketPrice : number;
  numberofTickets: number;
  bookings: Booking[];
  couponFlag: Boolean = true;
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  editBooking: Booking;
 U_username = JSON.parse(sessionStorage.getItem('currentUser')).username;
 U_firstName = JSON.parse(sessionStorage.getItem('currentUser')).firstName;
 U_lastName = JSON.parse(sessionStorage.getItem('currentUser')).firstName;
  constructor(private entityServies : EntityService, private bookingservice: BookingService,private router: Router ) { }

  init() {

    (window as any).onYouTubeIframeAPIReady = function () {}

    this.callyoutube();
  }

  ngOnInit() {

    this.entityServies.currentMessage.subscribe(message => this.message = message);
    for(let i=0;i<=10;i++){
        this.tickets.push(i.toString());
    }
    var _this = this;
    setTimeout(function(){
      _this.init();


  }, 1500);


    this.getBookings();
  }
  callyoutube(){

    this.video = this.message.videoURl;
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              reframe(e.target.a);
            }
          }
        }
      });

  }
 getBookings(){
  this.bookingservice.getBookings().subscribe(bookings =>{
    this.bookings = bookings;
    console.log(this.bookings);
    })
 }
  confirm_ticket(a){

     let entityName = this.message.entityName;
     let entityType = this.message.entityType;

     let  username = JSON.parse(sessionStorage.getItem('currentUser')).username;
     let  firstName = JSON.parse(sessionStorage.getItem('currentUser')).firstName;

     let  lastName = JSON.parse(sessionStorage.getItem('currentUser')).lastName;
     let userPhoneNumber = (<HTMLInputElement>document.getElementById('phone')).value;
     let userAddress = (<HTMLInputElement>document.getElementById('adr')).value + " "+  (<HTMLInputElement>document.getElementById('city')).value + " "+ (<HTMLInputElement>document.getElementById('state')).value + " " +  (<HTMLInputElement>document.getElementById('zip')).value + " ";
     let ticketsBooked = this.numberofTickets;
     let totalBookingPrice= this.bookedticketPrice;
     let bookingId= Math.random().toString(36).substr(2, 16).toUpperCase();
     let cardName = (<HTMLInputElement>document.getElementById('cname')).value;
     let cardNo = (<HTMLInputElement>document.getElementById('ccnum')).value
    // if (!title || !description || !dueDate || !time || !completed) {
    //   return;
    // }
    const newBooking: Booking = {entityName,entityType,username,firstName,lastName,userPhoneNumber,userAddress,ticketsBooked,totalBookingPrice,bookingId,cardName,cardNo } as Booking
    this.bookingservice.addBooking(newBooking).subscribe(booking => this.bookings.push(booking))

    //jsPDF

    var doc=new jsPDF();
    doc.font="Calibri";
    doc.text('Confirmation from TrEx\n'+'Booking ID :'+bookingId+'\n'+'Booking emailID:'+username+
    '\nEvent Name :'+entityName,25,25);
    doc.save('ticket.pdf');



  }
   increaseValue() {
    if(this.message.price=="Free"){
      document.getElementById('id_bookedticketPrice').style.display="none";
  }
     let ele= (<HTMLInputElement>document.getElementById('number'));
    var value = parseInt((<HTMLInputElement>document.getElementById('number')).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    ele.value = value.toString();
    this.numberofTickets = value;
   let priceNum:number = parseInt(this.message.price, 10);
     this.bookedticketPrice = (value * priceNum );
  }

   decreaseValue() {
    if(this.message.price=="Free"){
      document.getElementById('id_bookedticketPrice').style.display="none";
  }
    let ele= (<HTMLInputElement>document.getElementById('number'));
    var value = parseInt((<HTMLInputElement>document.getElementById('number')).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
   ele.value= value.toString();
   this.numberofTickets = value;
   let priceNum:number = parseInt(this.message.price, 10);
     this.bookedticketPrice = (value * priceNum );
  }

  scroll_to_ticketSection(){
    document.querySelector('.ticketSection').scrollIntoView({
      behavior: 'smooth'
    });
  }
  scroll_to_paymentSection(){
    document.querySelector('.paymentSection').scrollIntoView({
      behavior: 'smooth'
    });
  }
  hitLike(msg){
    alert("Hit Like");
  }
  load_homepage(){
    var url ="home";
  this.router.navigateByUrl(url).then(e => {
    if (e) {

      (<HTMLInputElement>document.getElementsByClassName('modal-backdrop')[0]).style.display ="none";
      console.log("Navigation is successful!");
    } else {
      console.log("Navigation has failed!");
    }
})
  }

  applyCoupon(booking) {
    let coupon = (<HTMLInputElement>document.getElementById("coupon")).value;
    if( coupon === "TREX20" && this.couponFlag){
      this.bookedticketPrice=(this.bookedticketPrice as any*80)/100;
      this.couponFlag =false;
    }
    if(coupon === "TREX50" && this.couponFlag){
      this.bookedticketPrice=(this.bookedticketPrice as any*50)/100;
      this.couponFlag =false;
    }
    if (this.message && this.couponFlag) {
      this.bookingservice.updateBooking(this.editBooking).subscribe(booking => {
        const indexx = booking ? this.bookings.findIndex(b => b._id === booking._id) : -1
        if (indexx > -1) {
          this.bookings[indexx] = booking 
        }
      })
      this.editBooking = undefined
    }
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
  
}

