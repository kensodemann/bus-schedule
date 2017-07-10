import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { MapComponent } from './map.component';
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
  updates: Subject<any>;
  testVehicles: Array<any> = [];
  constructor() { this.updates = new Subject; }
  load(agency: string): void { this.updates.next(this.testVehicles); }
}

describe('NextBusMapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [
        { provide: VehicleLocationService, useClass: VehicleLocationServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
