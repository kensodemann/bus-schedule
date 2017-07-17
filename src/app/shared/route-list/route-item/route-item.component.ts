import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() routeChecked = new EventEmitter<boolean>();

  constructor(private options: RouteOptionsService) { }

  ngOnInit() {
    this.setChecked();
    this.options.changedOptions.subscribe(() => this.setChecked());
  }

  onRouteChecked(checked) {
    checked ? this.options.showRoute('sf-muni', this.route.tag) : this.options.hideRoute('sf-muni', this.route.tag);
    this.routeChecked.emit(checked);
  }

  private setChecked() {
    this.checked = this.options.shouldDisplayRoute('sf-muni', this.route.tag);
  }

}
