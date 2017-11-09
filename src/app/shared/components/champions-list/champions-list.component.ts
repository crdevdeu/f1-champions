import { Component, Input, NgModule, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../core/modules/app-material.module';
import { DriverStandingsResults } from '../../../api/models/api.models';

@Component({
  selector: 'app-champions-list',
  templateUrl: 'champions-list.component.html',
  styleUrls: ['champions-list.component.scss']
})
export class ChampionsListComponent {
  @Input() championsList: DriverStandingsResults[];
  @Input() selectedDriver: Object|DriverStandingsResults;
  @Output() championSelected = new EventEmitter<DriverStandingsResults>();
  @Input() loading;

  onChampionSelection(champion: DriverStandingsResults): void {
    this.championSelected.emit(champion);
  }
}

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [ChampionsListComponent],
  exports: [ChampionsListComponent]
})
export class ChampionsListModule { }
