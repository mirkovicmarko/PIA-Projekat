import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './ui/loading/loading.component';
import { StarComponent } from './ui/star/star.component';
import { FormsModule } from '@angular/forms';
import { ObjectsMakeComponent } from './ui/objects-make/objects-make.component';



@NgModule({
  declarations: [
    LoadingComponent,
    StarComponent,
    ObjectsMakeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoadingComponent,
    StarComponent,
    ObjectsMakeComponent
  ]
})
export class SharedModule { }
