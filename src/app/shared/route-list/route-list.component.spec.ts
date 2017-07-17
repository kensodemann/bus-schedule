import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule, MdListModule } from '@angular/material';

import { Route } from '../../core/routes/route';
import { RouteItemComponent } from './route-item/route-item.component';
import { RouteListComponent } from './route-list.component';
import { RouteOptionsService } from '../../core/route-options/route-options.service';

class RouteOptionsServiceMock {
  hideRoute(agency: string, route: string | Array<string>) { }
  showRoute(agency: string, route: string | Array<string>) { }
}

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;
  let testRoutes: Array<Route>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteItemComponent,
        RouteListComponent
      ],
      imports: [
        FormsModule,
        MdCheckboxModule,
        MdListModule
      ],
      providers: [
        { provide: RouteOptionsService, useClass: RouteOptionsServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    initiailizeTestData();
    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('select all routes', () => {
    describe('true', () => {
      it('registers the change with the route options service', () => {
      });
    });

    describe('false', () => {
      it('registers the change with the route options service', () => {
      });
    });

  });

  function initiailizeTestData() {
    testRoutes = [
      { tag: '1', title: '1-California' },
      { tag: '1AX', title: '1AX-California A Express' },
      { tag: '1BX', title: '1BX-California B Express' },
      { tag: '2', title: '2-Clement' },
      { tag: '3', title: '3-Jackson' },
      { tag: '5', title: '5-Fulton' },
      { tag: '5R', title: '5R-Fulton Rapid' },
    ];
  }
});
