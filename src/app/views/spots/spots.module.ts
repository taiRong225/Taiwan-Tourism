import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotsRoutingModule } from './spots-routing.module';
import { SpotsSearchComponent } from './spots-search/spots-search.component';


@NgModule({
  declarations: [SpotsSearchComponent],
  imports: [
    CommonModule,
    SpotsRoutingModule
  ]
})
export class SpotsModule { }
