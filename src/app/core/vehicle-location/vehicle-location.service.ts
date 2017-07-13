import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';

// TODO: make this plural and rename the files
@Injectable()
export class VehicleLocationService {
  private vehicles: any;
  private lastAgency: string;
  private lastTime: number;

  data: Subject<any>;

  constructor(private http: Http) {
    this.data = new Subject();
  }

  refresh(agency: string, since?: number): void {
    this.http.get(environment.dataServiceUrl, {
      params: {
        command: 'vehicleLocations',
        a: agency,
        t: since || 0
      }
    }).map(res => res.text())
      .subscribe(xml => this.unpackXML(xml));
  }

  private unpackXML(xml: string) {
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      this.data.next({
        lastTime: parseInt(result.body.lastTime.time, 10),
        locations: !result.body.vehicle ? [] :
          Array.isArray(result.body.vehicle) ? result.body.vehicle : [result.body.vehicle]
      });
    });
  }
}
