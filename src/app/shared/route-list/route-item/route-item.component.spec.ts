import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule } from '@angular/material';

import { RouteOptionsService } from '../../../core/route-options/route-options.service';
import { RouteItemComponent } from './route-item.component';

class RouteOptionsServiceMock {
  hideRoute(agency: string, route: string) { }
  showRoute(agency: string, route: string) { }
  shouldDisplayRoute(agency: string, route: string): boolean { return true; }
}

describe('RouteItemComponent', () => {
  let component: RouteItemComponent;
  let fixture: ComponentFixture<RouteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouteItemComponent],
      imports: [
        FormsModule,
        MdCheckboxModule
      ],
      providers: [
        { provide: RouteOptionsService, useClass: RouteOptionsServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteItemComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
