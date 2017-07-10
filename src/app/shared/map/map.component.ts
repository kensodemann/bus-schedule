import { Component, OnInit } from '@angular/core';

import { VehicleLocationService } from '../../core/vehicle-location/vehicle-location.service';

declare var google: any;

@Component({
  selector: 'bus-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number;
  lon: number;

  constructor(private vehicleLocations: VehicleLocationService) { }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(37.7749, -122.4194),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById('bus-map'), mapProp);

    this.vehicleLocations.updates.subscribe(locs => {
      locs.forEach(loc => {
        const m = new google.maps.Marker({
          position: new google.maps.LatLng(loc.lat, loc.lon),
          map: map
        });
      });
    });

    this.vehicleLocations.load('sf-muni');
  }

}
