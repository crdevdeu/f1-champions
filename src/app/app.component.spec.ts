import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { MaterialModule } from './core/modules/app-material.module';
import { ChampionsListModule } from './shared/components/champions-list/champions-list.component';
import { SeasonResultsModule } from './shared/components/season-results/season-results.component';
import { ApiService } from './api/services/api.service';
import { DataFiltersService } from './api/services/data-filters.service';
import { driverStandingsMockData } from './core/tests/driver-standings-mock-data';
import { seasonResultsMockData } from './core/tests/season-results-mock-data';
import { DriverStandingsData, SeasonResultsData } from './api/models/api.models';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  class MockApiService {
    getDriverStandings(): Observable<DriverStandingsData> {
      return Observable.of(<any>driverStandingsMockData);
    }

    getSeasonResults(season: string, offset: string): Observable<SeasonResultsData> {
      return Observable.of(<any>seasonResultsMockData);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        SeasonResultsModule,
        ChampionsListModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApiService
        },
        DataFiltersService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create app component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('shoud fetch champions data', async(() => {
    component.getAllChampions();
    expect(Array.isArray(component.champions)).toBeTruthy();
  }));

  it('should update selectedDriver and set result offset to 0', () => {
    component.selectChampion(<any>{ season: 2008, driverData: {}});
    expect(component.selectedDriver).toBeTruthy();
    expect(component.resultsOffset).toEqual(0);
  });

  it('should update season results', () => {
    spyOn(component, 'setSeasonResults');
    spyOn(component, 'setResultsOptions');

    component.updateSeasonResults(2008, 0, 5);
    expect(component.setSeasonResults).toHaveBeenCalled();
    expect(component.setResultsOptions).toHaveBeenCalled();
  });

  it('should update seasonResultsOptions', () => {
    component.seasonResultsOptions = {
      pageSizeOptions: [6]
    };

    component.setResultsOptions(45, 6);
    expect(component.seasonResultsOptions.pageSizeOptions.length).toBeGreaterThan(1);
  });

  it('should add totalItems to pageSizeArr if it is not already the last item in the array', () => {
    const totalItems = 9;
    const originalArr = [0, 2 , 5, 6];
    const resultArray = component.addPageSizeArrayLastOption(originalArr, totalItems);
    expect(resultArray[resultArray.length - 1]).toEqual(totalItems);
  });

  it('should return the same pageSizeArr if totalItems is the last element of array', () => {
    const totalItems = 9;
    const originalArr = [0, 2 , 5, 6];
    const resultArray = component.addPageSizeArrayLastOption(originalArr, totalItems);
    expect(resultArray[resultArray.length - 1]).toEqual(originalArr[originalArr.length - 1]);
  });

  it('should return an Array of items whose elements are a range from interval to totalItems', () => {
    const interval = 5;
    const totalItems = 56;
    const resultsPageSizeArr = component.generatePageSizeArray([], totalItems, interval);
    expect(resultsPageSizeArr[resultsPageSizeArr.length - 1]).toEqual(55);
    expect(resultsPageSizeArr[0]).toEqual(interval);
  });

  it('should return pageSizeOptionsArray', () => {
    const interval = 5;
    const totalItems = 56;
    const lastItemGenFunction = component.addPageSizeArrayLastOption;

    const pageSizeOptionsArray = component.generateSeasonResultPageSizeOption(totalItems, interval, [], lastItemGenFunction);
    expect(pageSizeOptionsArray[0]).toEqual(interval);
    expect(pageSizeOptionsArray[pageSizeOptionsArray.length - 1]).toEqual(totalItems);
  });

  it('should updateSeasonResults', () => {
    component.seasonResults = {
      season: 0,
      totalItems: 0,
      races: []
    };
    component.setSeasonResults(2008, 34, [<any>{ race: 1}]);
    expect(component.seasonResults.season).not.toEqual(0);
    expect(component.seasonResults.totalItems).not.toEqual(0);
    expect(component.seasonResults.races.length).not.toEqual(0);

    expect(component.seasonResults.season).toEqual(2008);
    expect(component.seasonResults.totalItems).toEqual(34);
    expect(component.seasonResults.races.length).toEqual(1);
  });
});
