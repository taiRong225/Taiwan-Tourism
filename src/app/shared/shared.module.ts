import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { ImageDirective } from './directives/image.directive';
import { NearbyListComponent } from './components/nearby-list/nearby-list.component';
import { NearbyInfoComponent } from './components/nearby-info/nearby-info.component';

const components = [
  HeaderComponent,
  FooterComponent,
  NearbyListComponent,
  NearbyInfoComponent
]

const pipes = [
  SafePipe
]

const directives = [
  ImageDirective
]

const modules = [
  CommonModule,
  RouterModule
]

@NgModule({
  declarations: [
    components,
    pipes,
    directives
  ],
  imports: [
    modules
  ],
  exports: [
    components,
    pipes,
    directives
  ]
})
export class SharedModule { }
