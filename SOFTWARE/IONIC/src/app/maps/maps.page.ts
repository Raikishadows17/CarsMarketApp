import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute, Params  } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map : any;
  coord :  any = {lat: Number, lng: Number};
  constructor(
    private activateRoute: ActivatedRoute,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.coord.lat = parseFloat(this.activateRoute.snapshot.params.latitud),
    this.coord.lng = parseFloat(this.activateRoute.snapshot.params.longitud)

    
    console.log(this.coord);
    this.loadMap();
  }
  loadMap(){
    let mapContainer = document.getElementById('map');
    this.map  = new google.maps.Map(mapContainer, {
      center: this.coord,
      zoom: 12
    });
    //colocamos marcador
    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/ico_estoy_aqui.png',
      map: this.map,
      position: this.coord
    });
  }
}
