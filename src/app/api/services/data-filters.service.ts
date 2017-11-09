import { Injectable } from '@angular/core';

import { DriverStandingsData, DriverStandingsResults, SeasonResultsData, FilteredSeasonResults } from '../models/api.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';

@Injectable()
export class DataFiltersService {
  getStandingsResults(driverStandings$: Observable<DriverStandingsData>): Observable<DriverStandingsResults> {
    return driverStandings$.flatMap((driverStandingsData: DriverStandingsData) => {

      return driverStandingsData.MRData.StandingsTable.StandingsLists;
    });
  }

  addDriverStandingToStandingResult(driverStandingResults$: Observable<DriverStandingsResults>): Observable<DriverStandingsResults> {
    return driverStandingResults$.map((driverStandingResult: DriverStandingsResults) => {
      const [driverStanding] = driverStandingResult.DriverStandings;
      const driverData = driverStanding.Driver;
      driverStandingResult.driverData = driverData;

      return driverStandingResult;
    });
  }

  standingResultToArray(driverStandingResults$: Observable<DriverStandingsResults>): Observable<DriverStandingsResults[]> {
    return driverStandingResults$.reduce((acumulator, current) => {
      return acumulator.concat(current);
    }, []);
  }

  filterSeasonResults(seasonResults$: Observable<SeasonResultsData>): Observable<FilteredSeasonResults> {
    return seasonResults$.map((seasonResultsData) => {
      const races = seasonResultsData.MRData.RaceTable.Races.map((race) => {
        const [result] = <any>race.Results;
        const driver = result.Driver;
        race.winner = driver;

        return race;
      });
      const totalItems = parseInt(seasonResultsData.MRData.total, 10);
      const season = parseInt(seasonResultsData.MRData.RaceTable.season, 10);

      return {
        races,
        totalItems,
        season
      };
    });
  }
}
