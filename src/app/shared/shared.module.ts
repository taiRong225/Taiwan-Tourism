import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  FooterComponent
]

const modules = [
  CommonModule,
  RouterModule
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    modules
  ],
  exports: [
    components
  ]
})
export class SharedModule { }
