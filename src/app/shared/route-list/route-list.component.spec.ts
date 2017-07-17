import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule, MdListModule } from '@angular/material';
import { Subject } from 'rxjs/Subject';

import { Route } from '../../core/routes/route';
import { RouteItemComponent } from './route-item/route-item.component';
import { RouteListComponent } from './route-list.component';
import { RouteOptionsService } from '../../core/route-options/route-options.service';

class RouteOptionsServiceMock {
  changedOptions: Subject<Array<any>>;

  constructor() { this.changedOptions = new Subject();}

  hideRoute(agency: string, route: string | Array<string>) { }
  showRoute(agency: string, route: string | Array<string>) { }

  shouldDisplayRoute(agency: string, route: string): boolean { return true; }
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
    component.routes = testRoutes;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('select all routes', () => {
    describe('true', () => {
      it('registers the change with the route options service', () => {
        const routeOptions = fixture.debugElement.injector.get(RouteOptionsService);
        spyOn(routeOptions, 'hideRoute');
        spyOn(routeOptions, 'showRoute');
        component.onSelectAllChecked(true);
        expect(routeOptions.showRoute).toHaveBeenCalledTimes(1);
        expect(routeOptions.showRoute).toHaveBeenCalledWith('sf-muni', ['1', '1AX', '1BX', '2', '3', '5', '5R']);
        expect(routeOptions.hideRoute).not.toHaveBeenCalled();
      });
    });

    describe('false', () => {
      it('registers the change with the route options service', () => {
        const routeOptions = fixture.debugElement.injector.get(RouteOptionsService);
        spyOn(routeOptions, 'hideRoute');
        spyOn(routeOptions, 'showRoute');
        component.onSelectAllChecked(true);
        expect(routeOptions.showRoute).toHaveBeenCalledTimes(1);
        expect(routeOptions.showRoute).toHaveBeenCalledWith('sf-muni', ['1', '1AX', '1BX', '2', '3', '5', '5R']);
        expect(routeOptions.hideRoute).not.toHaveBeenCalled();
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
