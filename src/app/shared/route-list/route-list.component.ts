import { Component, Input, OnInit } from '@angular/core';

import { Route } from '../../core/routes/route';

@Component({
  selector: 'bus-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {
  selectAll: boolean;

  @Input() routes: Array<Route>;

  constructor() { }

  ngOnInit() {
  }

}
