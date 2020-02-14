import { Component, OnInit ,NgZone } from '@angular/core';
import { EntityService} from '../services/entity.service';
import { Entity } from '../models/entity';
import { Router } from "@angular/router";
declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config: any;
  entity: Entity[];
  searchEntity: Entity[];
  queryString:String = "Travel";
  entityTravelLength:number =0;
  entityExperienceLength: number;
  loadTime:boolean = false;
  searchedValue: any;
  constructor(private entityServies : EntityService, private router: Router) {

   }

  ngOnInit() {
    this.get_Entities();
    console.log(this.entity);
    const options = {
      zoom: 8,
      center: {
          lat: 42.3601,
          lng: -71.0589
      }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
  }

    get_Entities(): void {
      this.entityServies.getEntities().subscribe(entity =>{
        this.entity = entity;

        })
        this.config = {
          itemsPerPage: 2,
          currentPage: 1,
          totalItems: this.entityTravelLength
        };
      }
    pageChanged(event){
      this.config.currentPage = event;
    }


  T_E_toggle(event){
    for (var i = 0; i < this.entity.length; i++){
      var obj = this.entity[i];
      for (var key in obj){
        var attrValue = obj[key];
        if(attrValue == "Travel"){
          this.entityTravelLength++;
        }
      }
  }
if(event.target.checked){
  this.config.totalItems = this.entity.length - this.entityTravelLength ;
document.getElementById("homeBody").style.backgroundColor="#007bff";
this.queryString ="Experience";
  }
  else{
     this.config.totalItems = this.entityTravelLength;
      document.getElementById("homeBody").style.backgroundColor="#20c997";
      this.queryString ="Travel";
  }
  this.entityTravelLength=0;
}


book_ticket(obj: Entity){
  this.entityServies.changeMessage(obj);
  console.log(obj);
   var url ="booking"
  // this.showMapLocation(obj);
  this.router.navigateByUrl(url).then(e => {
    if (e) {
      console.log("Navigation is successful!");
    } else {
      console.log("Navigation has failed!");
    }
})


}
showMapLocation(a:any){
  const options = {
    zoom: 8,
    center: {
        lat: a.coordX,
        lng: (-1)* a.coordY
    }
  }
 this.initMap(a);
}

initMap(a) {
  // Map options
  var ss= (-1) *  a.coordY;
  const options = {
    zoom: 8,
    center: {
        lat: a.coordX,
        lng: ss
    }
  }


  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(event) {
      // Add marker
      addMarker({
          coords: event.latLng
      });
  });
  var markers = [{
          coords: {
            lat: a.coordX,
            lng: ss
          },
         // iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content: '<h4>'+a.entityName+'</h4><br/><span>Price : '+ a.price+'</span><br/><span>Rating : '+ a.rating+'</span><br/><a target="_blank" href=https://www.google.com/maps/@'+a.coordX+','+(-1) *  a.coordY+',19z>Open in Google Maps</a>'
      }
  ];

  // Loop through markers

      // Add marker
      addMarker(markers);


  // Add Marker Function
  function addMarker(propss) {
 var props  =propss[0];
      var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          //icon:props.iconImage
      });

      // Check for customicon
      if (props.iconImage) {
          // Set icon image
          marker.setIcon(props.iconImage);
      }

      // Check content
      if (props.content) {
          var infoWindow = new google.maps.InfoWindow({
              content: props.content
          });

          marker.addListener('click', function() {
              infoWindow.open(map, marker);
          });
      }
  }
}

searchEvent(a:any) {

   this.searchedValue = (<HTMLInputElement>document.getElementById('search_Entity')).value
  this.entityServies.getSearchEntities().subscribe(searchEntity =>{
    this.searchEntity = searchEntity;
    })
}

}

