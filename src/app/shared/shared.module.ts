import { NgModule } from '@angular/core';

import { RouteListModule } from './route-list/route-list.module';
import { VehicleLocationMapModule } from './vehicle-location-map/vehicle-location-map.module';

@NgModule({
  exports: [
    RouteListModule,
    VehicleLocationMapModule
  ]
})
export class SharedModule { }
