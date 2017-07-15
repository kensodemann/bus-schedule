import { Component, OnDestroy, OnInit } from '@angular/core';

import { MarkerCollection } from './marker-collection';
import { VehicleLocationService } from '../../core/vehicle-location/vehicle-location.service';

declare var google: any;

@Component({
  selector: 'bus-vehicle-location-map',
  templateUrl: './vehicle-location-map.component.html',
  styleUrls: ['./vehicle-location-map.component.scss']
})
export class VehicleLocationMapComponent implements OnDestroy, OnInit {
  private interval;
  private map;
  private markers: MarkerCollection;

  constructor(private vehicleLocations: VehicleLocationService) { }

  ngOnInit() {
    this.createMap();
    this.subscribeToVehicleData();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private buildMarkers(locs: any) {
    locs.locations.forEach(loc => {
      this.markers.merge(loc);
    });
  }

  private createMap() {
    this.map = new google.maps.Map(document.getElementById('vehicle-location-map'), {
      center: new google.maps.LatLng(37.7749, -122.4194),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.markers = new MarkerCollection(this.map);
  }

  private subscribeToVehicleData() {
    this.vehicleLocations.data.subscribe(locs => this.buildMarkers(locs));
    this.vehicleLocations.refresh('sf-muni');
    this.interval = setInterval(() => this.vehicleLocations.refresh('sf-muni'), 15000);
  }

}
