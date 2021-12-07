import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestaurantNearbyComponent } from './restaurant-nearby/restaurant-nearby.component';


@NgModule({
  declarations: [RestaurantSearchComponent, RestaurantDetailComponent, RestaurantNearbyComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    SharedModule
  ]
})
export class RestaurantModule { }
