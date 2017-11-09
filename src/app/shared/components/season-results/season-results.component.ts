import { Component, NgModule, Input, OnChanges, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material';

import { MaterialModule } from '../../../core/modules/app-material.module';
import { FilteredSeasonResults } from '../../../api/models/api.models';
import { SeasonResultsOptions } from '../../models/season-results.model';

@Component({
  selector: 'app-season-results',
  templateUrl: 'season-results.component.html',
  styleUrls: ['season-results.component.scss']
})
export class SeasonResultsComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() seasonResults: FilteredSeasonResults;
  @Input() options: SeasonResultsOptions;
  @Input() championData: any;
  @Output() paginatorChanged = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.championData) {
      this.resetPagination();
    }
  }

  pageChanged($event) {
    this.paginatorChanged.emit($event);
  }

  resetPagination() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.options.pageSizeOptions[0];
    }
  }
}

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [SeasonResultsComponent],
  exports: [SeasonResultsComponent]
})
export class SeasonResultsModule { }
