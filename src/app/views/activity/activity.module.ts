import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitySearchComponent } from './activity-search/activity-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ActivitySearchComponent, ActivityDetailComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    SharedModule
  ]
})
export class ActivityModule { }
