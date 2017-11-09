import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { ChampionsListComponent } from './champions-list.component';
import { MaterialModule } from '../../../core/modules/app-material.module';

describe('ChampionsListComponent', () => {
  let fixture: ComponentFixture<ChampionsListComponent>;
  let component: ChampionsListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [ChampionsListComponent]
    });

    fixture = TestBed.createComponent(ChampionsListComponent);
    component = fixture.componentInstance;
  });

  it('should create the ChampionsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should emit driver data to parent when champion is selected', async(() => {
    component.championSelected.subscribe((championData) => {
      expect(championData).toBeTruthy();
    });

    component.onChampionSelection(<any>{ season: '2008', driverData: {}, round: '2'});
  }));
});
