import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { VehicleLocationService } from './vehicle-location/vehicle-location.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    VehicleLocationService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
