import { NgModule } from '@angular/core';
import { MapModule } from './map/map.module';

@NgModule({
  exports: [
    MapModule
  ]
})
export class SharedModule { }
