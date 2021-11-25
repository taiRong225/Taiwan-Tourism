import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';

const components = [
  HeaderComponent,
  FooterComponent
]

const pipes = [
  SafePipe
]

const modules = [
  CommonModule,
  RouterModule
]

@NgModule({
  declarations: [
    components,
    pipes
  ],
  imports: [
    modules
  ],
  exports: [
    components,
    pipes
  ]
})
export class SharedModule { }
