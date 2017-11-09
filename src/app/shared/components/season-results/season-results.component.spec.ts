import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { SeasonResultsComponent } from './season-results.component';
import { MaterialModule } from '../../../core/modules/app-material.module';

describe('SeasonResultsComponent', () => {
  let fixture: ComponentFixture<SeasonResultsComponent>;
  let component: SeasonResultsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [SeasonResultsComponent]
    });

    fixture = TestBed.createComponent(SeasonResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create the ChampionsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should emit paginatorChanged event', async(() => {
    const mockEventData = { pageIndex: 0, pageSize: 10 };

    component.paginatorChanged.subscribe((eventData) => {
      expect(eventData.pageIndex).toEqual(mockEventData.pageIndex);
      expect(eventData.pageSize).toEqual(mockEventData.pageSize);
    });
    component.pageChanged(mockEventData);
  }));

  it('should call reset pagination when championData changes are received', () => {
    spyOn(component, 'resetPagination');
    const mockPreviousValue = {
      driverId: 'alonso'
    };

    const mockCurrentValue = {
      driverId: 'lewis'
    };
    const mockSimpleChanges = {
      championData: new SimpleChange(mockPreviousValue, mockCurrentValue, false)
    };

    component.ngOnChanges(mockSimpleChanges);
    expect(component.resetPagination).toHaveBeenCalled();
  });

  it('should change the options of material paginator', () => {
    const mockPageSizeOptions = {
      pageSizeOptions: [5, 10, 15, 20]
    };

    const mockMaterialPaginator = {
      pageSize: 10,
      pageIndex: 2
    };
    component.options = mockPageSizeOptions;
    component.paginator = <any>mockMaterialPaginator;
    expect(component.paginator.pageSize).toEqual(10);
    expect(component.paginator.pageIndex).toEqual(2);
    expect(component.options.pageSizeOptions.length).toEqual(4);

    component.resetPagination();
    expect(component.paginator.pageSize).toEqual(component.options.pageSizeOptions[0]);
    expect(component.paginator.pageIndex).toEqual(0);
  });
});
