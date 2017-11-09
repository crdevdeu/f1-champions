import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DriverStandingsData, SeasonResultsData } from '../models/api.models';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getDriverStandings(): Observable<DriverStandingsData> {
    return this.http
      .get<DriverStandingsData>(
        `${environment.apiHost}/f1/driverStandings/1.json?offset=${environment.championsListOffset}&limit=${environment.championsListLimit}`
      );
  }

  getSeasonResults(season: number, seasonResultsOffset: number, pageSize: number): Observable<SeasonResultsData> {
    return this.http.get<SeasonResultsData>([
      environment.apiHost,
      'f1',
      season,
      'results',
      `1.json?limit=${pageSize}&offset=${seasonResultsOffset}`
    ].join('/'));
  }
}
