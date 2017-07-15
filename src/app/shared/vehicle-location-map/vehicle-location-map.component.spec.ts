import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { RouteOptionsService } from '../../core/route-options/route-options.service';
import { VehicleLocationMapComponent } from './vehicle-location-map.component';
import { VehicleLocationsService } from '../../core/vehicle-locations/vehicle-locations.service';

window['google'] = {
  maps: {
    LatLng: function() { },
    Map: function() { },
    MapTypeId: {
      ROADMAP: 1
    },
    Marker: function() { }
  }
};

class VehicleLocationServiceMock {
  data: Subject<any>;
  testLastTime: number;
  testVehicles: Array<any> = [];
  constructor() { this.data = new Subject; }
  refresh(agency: string, since?: number): void {
    this.data.next({
      lastTime: this.testLastTime,
      locations: this.testVehicles
    });
  }
}

describe('VehicleLocationMapComponent', () => {
  let component: VehicleLocationMapComponent;
  let fixture: ComponentFixture<VehicleLocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleLocationMapComponent],
      providers: [
        RouteOptionsService,
        { provide: VehicleLocationsService, useClass: VehicleLocationServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
