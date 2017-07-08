import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bus-next-bus-map',
  templateUrl: './next-bus-map.component.html',
  styleUrls: ['./next-bus-map.component.scss']
})
export class NextBusMapComponent implements OnInit {
  lat: number;
  lng: number;

  constructor() { }

  ngOnInit() {
    this.lat = 42.977848;
    this.lng = -88.248212;
  }

}
