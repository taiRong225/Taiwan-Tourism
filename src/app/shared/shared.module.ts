import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { ImageDirective } from './directives/image.directive';

const components = [
  HeaderComponent,
  FooterComponent
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
