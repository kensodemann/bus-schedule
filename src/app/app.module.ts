import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdCheckboxModule, MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule } from '@angular/material';

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
    MdCheckboxModule,
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
