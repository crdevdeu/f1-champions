import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

import { DriverStandingsData } from '../models/api.models';
import { DataFiltersService } from './data-filters.service';
import { driverStandingsMockData } from '../../core/tests/driver-standings-mock-data';
import { seasonResultsMockData } from '../../core/tests/season-results-mock-data';

describe('DataFiltersService', () => {
  let dataFiltersService: DataFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFiltersService]
    });

    dataFiltersService = TestBed.get(DataFiltersService);
  });

  it('shoud return DriverStandingsResults stream', (done) => {
    const mockDriverStandingsData$ = Observable.of(<any>driverStandingsMockData);
    const driverStandingsResults$ = dataFiltersService.getStandingsResults(mockDriverStandingsData$);

    driverStandingsResults$.take(1).subscribe((driverStandingResult) => {
      expect(driverStandingResult.season).toBeTruthy();
      expect(driverStandingResult.round).toBeTruthy();
      expect(driverStandingResult.DriverStandings).toBeTruthy();
      done();
    });
  });

  it('should add driverData to DriverStandingResult', (done) => {
    const mockDriverStandingsData$ = Observable.of(<any>driverStandingsMockData);
    const driverStandingsResults$ = dataFiltersService.getStandingsResults(mockDriverStandingsData$);
    const driverStandingResultWithDriverData$ = dataFiltersService.addDriverStandingToStandingResult(driverStandingsResults$);

    driverStandingResultWithDriverData$.take(1).subscribe((driverStandingResult) => {
      expect(driverStandingResult.driverData).toBeTruthy();
      done();
    });
  });

  it('should return array of DriverStandingResult', (done) => {
    const mockDriverStandingsData$ = Observable.of(<any>driverStandingsMockData);
    const driverStandingsResults$ = dataFiltersService.getStandingsResults(mockDriverStandingsData$);
    const driverStandingResultWithDriverData$ = dataFiltersService.addDriverStandingToStandingResult(driverStandingsResults$);
    const driverStandingResultArray$ = dataFiltersService.standingResultToArray(driverStandingResultWithDriverData$);

    driverStandingResultArray$.subscribe((driverStandingResultArray) => {
      expect(Array.isArray(driverStandingResultArray)).toBeTruthy();
      done();
    });
  });

  it('should filter season results', (done) => {
    const mockSeasonResultsData$ = Observable.of(seasonResultsMockData);

    dataFiltersService.filterSeasonResults(mockSeasonResultsData$).subscribe((filteredSeasonResults) => {
      expect(filteredSeasonResults.totalItems).toBeTruthy();
      expect(filteredSeasonResults.races).toBeTruthy();
      expect(filteredSeasonResults.season).toBeTruthy();

      done();
    });
  });
});
