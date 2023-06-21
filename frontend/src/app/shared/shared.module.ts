import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './ui/loading/loading.component';
import { StarComponent } from './ui/star/star.component';



@NgModule({
  declarations: [
    LoadingComponent,
    StarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    StarComponent
  ]
})
export class SharedModule { }
