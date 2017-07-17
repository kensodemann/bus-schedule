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
  }

  onSelectAllChecked(checked) {
    const routes = this.routes.map(r => r.tag);
  }

}
