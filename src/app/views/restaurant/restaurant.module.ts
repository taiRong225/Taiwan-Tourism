import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RestaurantSearchComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantModule { }
