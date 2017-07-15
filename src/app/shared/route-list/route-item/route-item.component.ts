import { Component, Input, OnInit } from '@angular/core';

import { RouteOptionsService } from '../../../core/route-options/route-options.service';
import { Route } from '../../../core/routes/route';

@Component({
  selector: 'bus-route-item',
  templateUrl: './route-item.component.html',
  styleUrls: ['./route-item.component.scss']
})
export class RouteItemComponent implements OnInit {
  checked: boolean;

  @Input() route: Route;

  constructor(private options: RouteOptionsService) { }

  ngOnInit() {
    this.checked = this.options.shouldDisplayRoute('sf-muni', this.route.tag);
  }

  onRouteChecked(checked) {
    checked ? this.options.showRoute('sf-muni', this.route.tag) : this.options.hideRoute('sf-muni', this.route.tag);
  }

}
