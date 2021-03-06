import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdIconModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LocalStorageModule.withConfig({
      prefix: 'bus-sched',
      storageType: 'localStorage'
    }),
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
