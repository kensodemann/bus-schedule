import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';

@Injectable()
export class VehicleLocationService {
  private vehicles: any;
  private lastAgency: string;
  private lastTime: number;

  updates: Subject<any>;

  constructor(private http: Http) {
    this.updates = new Subject();
  }

  load(agency: string): void {
    this.vehicles = {};
    this.lastTime = 0;
    this.lastAgency = agency;
    this.refresh();
  }

  refresh(): void {
    if (!this.lastAgency) {
      throw new Error('refresh called without agency set, did you load() and agency?');
    }

    this.http.get(environment.dataServiceUrl, {
      params: {
        command: 'vehicleLocations',
        a: this.lastAgency,
        t: this.lastTime
      }
    }).map(res => res.text())
      .subscribe(xml => this.unpackXML(xml));
  }

  private unpackXML(xml: string) {
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      this.lastTime = result.body.lastTime.time;
      this.updateVehicleHash(result.body.vehicle);
      this.updates.next(this.vehicleHashAsArray());
    });
  }

  private updateVehicleHash(vehicles: any) {
    if (vehicles) {
      if (Array.isArray(vehicles)) {
        vehicles.forEach(v => this.vehicles[v.id] = v);
      } else {
        this.vehicles[vehicles.id] = vehicles;
      }
    }
  }

  private vehicleHashAsArray() {
    const vals = [];
    for (const key in this.vehicles) {
      if (this.vehicles.hasOwnProperty(key)) {
        vals.push(this.vehicles[key]);
      }
    }
    return vals;
  }
}
