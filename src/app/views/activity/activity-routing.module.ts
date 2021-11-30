import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitySearchComponent } from './activity-search/activity-search.component';


const routes: Routes = [
  {
    path: 'activity',
    children: [
      { path: 'search', component: ActivitySearchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
