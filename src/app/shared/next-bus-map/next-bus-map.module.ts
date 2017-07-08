import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { NextBusMapComponent } from './next-bus-map.component';

@NgModule({
  imports: [AgmCoreModule],
  declarations: [NextBusMapComponent],
  exports: [NextBusMapComponent]
})
export class NextBusMapModule { }
