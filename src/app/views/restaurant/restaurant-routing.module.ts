import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';


const routes: Routes = [
  {
    path: 'restaurant',
    children: [
      { path: 'search', component: RestaurantSearchComponent },
      { path: ':ID', component: RestaurantDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
