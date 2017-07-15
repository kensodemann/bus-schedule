import { VehicleLocation } from '../../core/vehicle-locations/vehicle-location';

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

  private removeFromOtherRoutes(loc: VehicleLocation): void {
    const routes = Object.keys(this.hash);
    routes.forEach(route => {
      if (route !== loc.routeTag && this.hash[route][loc.id]) {
        this.hash[route][loc.id].map = null;
        delete this.hash[route][loc.id];
      }
    });
  }
}
