import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { driverStandingsMockData } from '../../core/tests/driver-standings-mock-data';
import { seasonResultsMockData } from '../../core/tests/season-results-mock-data';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get DriverStandingsData from API', (done) => {
    apiService.getDriverStandings().subscribe((championsData) => {
      expect(championsData.MRData).toBeTruthy();
      done();
    });

    const request = httpMock.expectOne(
      `${environment.apiHost}/f1/driverStandings/1.json?offset=${environment.championsListOffset}&limit=${environment.championsListLimit}`
    );
    request.flush(driverStandingsMockData);
    httpMock.verify();
  });

  it('should get SeasonResultsDataFromApi', (done) => {
    const apiCallOffset = 10;
    const resultsSeason = 2008;
    apiService.getSeasonResults(resultsSeason, 10, 5).subscribe((seasonResultsData) => {
      expect(seasonResultsData.MRData).toBeTruthy();
      done();
    });

    const request = httpMock
      .expectOne([
        environment.apiHost,
        'f1',
        resultsSeason,
        'results',
        `1.json?limit=${environment.seasonResultsPageSizeOptionsOffset}&offset=${apiCallOffset}`
      ].join('/'));

    request.flush(seasonResultsMockData);
    httpMock.verify();
  });
});
