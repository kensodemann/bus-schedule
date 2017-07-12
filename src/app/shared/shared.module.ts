import { NgModule } from '@angular/core';
import { VehicleLocationMapModule } from './vehicle-location-map/vehicle-location-map.module';

@NgModule({
  exports: [
    VehicleLocationMapModule
  ]
})
export class SharedModule { }
