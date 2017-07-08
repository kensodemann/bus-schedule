import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgmCoreModule } from '@agm/core';

import { NextBusMapComponent } from './next-bus-map.component';

describe('NextBusMapComponent', () => {
  let component: NextBusMapComponent;
  let fixture: ComponentFixture<NextBusMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AgmCoreModule.forRoot()],
      declarations: [NextBusMapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextBusMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
