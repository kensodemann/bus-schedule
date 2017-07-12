import { VehicleLocation } from '../../core/vehicle-location/vehicle-location';

declare var google: any;

export class MarkerCollection {
  private hash = {};

  constructor(private map: any) { }

  merge(loc: VehicleLocation): void {
    if (this.markerExists(loc)) {
      this.moveMarker(loc);
    } else {
      this.addMarker(loc);
    }
    this.removeFromOtherRoutes(loc);
  }

  private addMarker(loc: VehicleLocation): void {
    this.hash[loc.routeTag] = this.hash[loc.routeTag] || {};
    this.hash[loc.routeTag][loc.id] = new google.maps.Marker({
      position: new google.maps.LatLng(loc.lat, loc.lon),
      map: this.map,
      title: loc.id
    });
  }

  private markerExists(loc: VehicleLocation): boolean {
    return this.hash[loc.routeTag] && this.hash[loc.routeTag][loc.id];
  }

  private moveMarker(loc: VehicleLocation): void {
    this.hash[loc.routeTag][loc.id].setPosition(new google.maps.LatLng(loc.lat, loc.lon));
  }

  private removeFromOtherRoutes(loc: VehicleLocation): void { }
}
