import { Injectable } from '@angular/core';

@Injectable()
export class OptionsService {
  private options = {};

  constructor() { }

  hideRoute(agency: string, route: string): void {
    this.setRouteVisibility(agency, route, false);
  }

  showRoute(agency: string, route: string): void {
    this.setRouteVisibility(agency, route, true);
  }

  shouldDisplayRoute(agency: string, route: string): boolean {
    return this.options[agency] && this.options[agency][route];
  }

  private setRouteVisibility(agency: string, route: string, visible: boolean): void {
    this.options[agency] = this.options[agency] || {};
    this.options[agency][route] = visible;
  }
}
