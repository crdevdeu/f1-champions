import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './core/modules/app-material.module';
import { AppComponent } from './app.component';
import { ApiService } from './api/services/api.service';
import { DataFiltersService } from './api/services/data-filters.service';
import { ChampionsListModule } from './shared/components/champions-list/champions-list.component';
import { SeasonResultsModule } from './shared/components/season-results/season-results.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ChampionsListModule,
    SeasonResultsModule
  ],
  providers: [
    ApiService,
    DataFiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
