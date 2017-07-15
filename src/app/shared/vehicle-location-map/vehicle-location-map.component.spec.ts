import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { VehicleLocationMapComponent } from './vehicle-location-map.component';
import { VehicleLocationService } from '../../core/vehicle-location/vehicle-location.service';

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

describe('NextBusMapComponent', () => {
  let component: VehicleLocationMapComponent;
  let fixture: ComponentFixture<VehicleLocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleLocationMapComponent],
      providers: [
        { provide: VehicleLocationService, useClass: VehicleLocationServiceMock }
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
