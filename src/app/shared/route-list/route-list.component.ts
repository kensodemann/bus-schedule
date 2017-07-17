import { Component, Input, OnInit } from '@angular/core';

import { RouteOptionsService } from '../../core/route-options/route-options.service';
import { Route } from '../../core/routes/route';

@Component({
  selector: 'bus-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {
  selectAll: boolean;

  @Input() routes: Array<Route>;

  constructor(private routeOptions: RouteOptionsService) { }

  ngOnInit() {
    this.selectAll = !!this.routes && this.allRoutesAreSelected();
  }

  onSelectAllChecked(checked) {
    const routes = this.routes.map(r => r.tag);
    if (checked) {
      this.routeOptions.showRoute('sf-muni', routes);
    } else {
      this.routeOptions.hideRoute('sf-muni', routes);
    }
  }

  private allRoutesAreSelected(): boolean {
    let allSelected = true;
    this.routes.forEach(route =>
      allSelected = allSelected && this.routeOptions.shouldDisplayRoute('sf-muni', route.tag));
    return allSelected;
  }

}
