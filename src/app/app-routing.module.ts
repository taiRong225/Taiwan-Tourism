import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./views/spots/spots.module').then(m => m.SpotsModule) },
  { path: '', loadChildren: () => import('./views/restaurant/restaurant.module').then(m => m.RestaurantModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
