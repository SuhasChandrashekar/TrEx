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
  Url:String;
  tickets: Array<string> = [];
  bookedticketPrice : number;
  numberofTickets: number;
  bookings: Booking[];
  entities: Entity[];
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
 U_username = JSON.parse(sessionStorage.getItem('currentUser')).username;
 U_firstName = JSON.parse(sessionStorage.getItem('currentUser')).firstName;
 U_lastName = JSON.parse(sessionStorage.getItem('currentUser')).firstName;
  constructor(private entityServies : EntityService, private bookingservice: BookingService,private router: Router ) { }

  init() {
// Loading the  Iframe Youtube API ready  before the data is rendered.
    (window as any).onYouTubeIframeAPIReady = function () {}
// Checking for the  current user and naviagting to different URL
    if(sessionStorage.getItem('currentUser')== null){
      var url ="login";
      this.router.navigateByUrl(url).then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
    })
    }
    //Calling the youtube function to load the data to the iframe
    this.callyoutube();
  }

  ngOnInit() {
// subscribing the message from the home component to get the selected data
    this.entityServies.currentMessage.subscribe(message => this.message = message);
    for(let i=0;i<=10;i++){
        this.tickets.push(i.toString());
    }
    var _this = this;
    setTimeout(function(){
      _this.init();


  }, 1500);

// To get all the bookings
    this.getBookings();
  }
  // Loading the iframe for youtube video play
  callyoutube(){

    this.Url = "https://www.youtube.com/watch?v="+ this.message.videoURl;
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
  // Subscribing all the bookings
 getBookings(){
  this.bookingservice.getBookings().subscribe(bookings =>{
    this.bookings = bookings;
    console.log(this.bookings);
    })
 }

 // To confirm the ticket and to store it in Mongo and to send email and  automatically download pdf

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
     let cardNo = (<HTMLInputElement>document.getElementById('ccnum')).value;
//creating a schema and applying data to it.
    const newBooking: Booking = {entityName,entityType,username,firstName,lastName,userPhoneNumber,userAddress,ticketsBooked,totalBookingPrice,bookingId,cardName,cardNo } as Booking
    this.bookingservice.addBooking(newBooking).subscribe(booking => this.bookings.push(booking))
// subtracting the count of the messages from booked ones
    this.message.count =   this.message.count - ticketsBooked;
    //Updating the entity count on booking
    this.entityServies.updateEntityCount(this.message).subscribe(entity => {
      const indexx = entity ? this.entities.findIndex(b => b._id === entity._id) : -1
      if (indexx > -1) {
        this.entities[indexx] = entity
      }
    })

        //jsPDF
// Used to download the PDF after booking is confirmed
    var doc=new jsPDF();
    doc.font="Calibri";
    doc.text('Confirmation from TrEx\n\n\n\n'+'Booking ID :'+bookingId+'\n'+'Booking emailID:'+username+
    '\nEvent Name :'+entityName+'\nBooking Type :'+entityType+`\n`,45,45);
    doc.save('ticket.pdf');


    alert("Your booking is successfully completed and email has been mailed to you.");
    var url ="home";
    // redirecting to different URl
    this.router.navigateByUrl(url).then(e => {
      if (e) {
        console.log("Navigation is successful!");
        //location.href="";
      } else {
        console.log("Navigation has failed!");
      }
  })
}
// To increase in value of the booking number
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
// To decrease in value of the booking number
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
// implementing smooth scroll feature
  scroll_to_ticketSection(){
    document.querySelector('.ticketSection').scrollIntoView({
      behavior: 'smooth'
    });
  }

// implementing smooth scroll feature
  scroll_to_paymentSection(){
    document.querySelector('.paymentSection').scrollIntoView({
      behavior: 'smooth'
    });
  }
  hitLike(msg){

  }
  //Used to load home page
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

  // Used to play and pause the youtube
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
  // to check if the youtube player has got any error
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
