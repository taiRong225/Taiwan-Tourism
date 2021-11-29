import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';


const routes: Routes = [
  {
    path: 'restaurant',
    children: [
      { path: 'search', component: RestaurantSearchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
