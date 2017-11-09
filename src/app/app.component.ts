import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/services/api.service';

import { DriverStandingsResults, SeasonResultsData, FilteredSeasonResults} from './api/models/api.models';
import { SeasonResultsOptions } from './shared/models/season-results.model';
import { Race } from './api/models/api.models';
import { DataFiltersService } from './api/services/data-filters.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public champions: DriverStandingsResults[];
  public resultsOffset = 0;
  public loadingChampionsList = true;
  public seasonResults: any = {
    season: 0,
    totalItems: 0,
    races: []
  };
  public selectedDriver: any|DriverStandingsResults = {
    driverData: {},
    season: 0
  };

  public seasonResultsOptions: SeasonResultsOptions = {
    pageSizeOptions: [5, 10]
  };

  constructor(private apiService: ApiService, private dataFiltersService: DataFiltersService) { }

  ngOnInit() {
    this.getAllChampions();
  }

  generateSeasonResultPageSizeOption(totalItems: number, interval: number, initialPageSizeArr: number[], lastOptionGenerator: Function) {
    const pageSizeArr = this.generatePageSizeArray(initialPageSizeArr, totalItems, interval);
    return lastOptionGenerator(pageSizeArr, totalItems);
  }

  generatePageSizeArray(pageSizeArr: number[], totalItems: number, interval: number) {
    for (let i = interval; i < totalItems; i += interval) {
      pageSizeArr.push(i);
    }
    return pageSizeArr;
  }

  addPageSizeArrayLastOption(pageSizeArr: number[], totalItems: number) {
    if (pageSizeArr[pageSizeArr.length - 1] !== totalItems) {
      pageSizeArr.push(totalItems);
    }

    return pageSizeArr;
  }

  selectChampion(champion: DriverStandingsResults): void {
    this.selectedDriver = champion;
    this.resultsOffset = 0;
    this.updateSeasonResults(this.selectedDriver.season, this.resultsOffset, environment.seasonResultsPageSizeOptionsOffset);
  }

  updateSeasonResults(season: number, offset: number, resultsSize: number): void {
    const seasonResults$ = this.apiService.getSeasonResults(season, offset, resultsSize);

    this.dataFiltersService.filterSeasonResults(seasonResults$)
      .subscribe((filteredSeasonResults) => {
        this.setSeasonResults(filteredSeasonResults.season,
        filteredSeasonResults.totalItems, filteredSeasonResults.races);
        this.setResultsOptions(filteredSeasonResults.totalItems, environment.seasonResultsPageSizeOptionsOffset);
      });
  }

  setSeasonResults(season: number, totalItems: number, races: Race[]) {
    this.seasonResults = {
      season,
      totalItems,
      races
    };
  }

  setResultsOptions(totalItems: number, interval: number) {
    this.seasonResultsOptions = {
      pageSizeOptions: this.generateSeasonResultPageSizeOption(totalItems, interval, [], this.addPageSizeArrayLastOption)
    };
  }

  updateSeasonResultsSize(paginatorNewValues: any) {
    const { pageIndex, pageSize } = paginatorNewValues;
    const apiResultsOffset = pageIndex * pageSize;
    this.updateSeasonResults(this.selectedDriver.season, apiResultsOffset, pageSize);
  }

  getAllChampions() {
    const driverStandings$ = this.apiService.getDriverStandings();
    const standingsResults$ = this.dataFiltersService.getStandingsResults(driverStandings$);
    const standingResultWithDriver$ = this.dataFiltersService.addDriverStandingToStandingResult(standingsResults$);
    this.dataFiltersService.standingResultToArray(standingResultWithDriver$).subscribe((driverStandingsResultsArray) => {
      this.champions = driverStandingsResultsArray;
      this.loadingChampionsList = false;
    });
  }
}
