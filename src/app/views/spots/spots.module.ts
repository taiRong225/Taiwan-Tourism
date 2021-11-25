import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotsRoutingModule } from './spots-routing.module';
import { SpotsSearchComponent } from './spots-search/spots-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotsDetailComponent } from './spots-detail/spots-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SpotsSearchComponent, SpotsDetailComponent],
  imports: [
    CommonModule,
    SpotsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    SharedModule
  ]
})
export class SpotsModule { }
