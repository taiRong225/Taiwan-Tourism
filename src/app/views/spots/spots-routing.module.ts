import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotsDetailComponent } from './spots-detail/spots-detail.component';
import { SpotsNearbyComponent } from './spots-nearby/spots-nearby.component';
import { SpotsSearchComponent } from './spots-search/spots-search.component';


const routes: Routes = [
  {
    path: 'spots',
    children: [
      { path: 'search', component: SpotsSearchComponent },
      { path: ':ID', component: SpotsDetailComponent },
      { path: ':ID/nearby', component: SpotsNearbyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotsRoutingModule { }
