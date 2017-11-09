import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
