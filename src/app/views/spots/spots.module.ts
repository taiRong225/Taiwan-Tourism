import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotsRoutingModule } from './spots-routing.module';
import { SpotsSearchComponent } from './spots-search/spots-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpotsSearchComponent],
  imports: [
    CommonModule,
    SpotsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpotsModule { }
