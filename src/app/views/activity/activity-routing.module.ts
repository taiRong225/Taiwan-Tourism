import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivitySearchComponent } from './activity-search/activity-search.component';


const routes: Routes = [
  {
    path: 'activity',
    children: [
      { path: 'search', component: ActivitySearchComponent },
      { path: ':ID', component: ActivityDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
