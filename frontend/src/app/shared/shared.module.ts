import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './ui/loading/loading.component';
import { StarComponent } from './ui/star/star.component';
import { FormsModule } from '@angular/forms';
import { ObjectsMakeComponent } from './ui/objects-make/objects-make.component';
import { ObjectsShowComponent } from './ui/objects-show/objects-show.component';



@NgModule({
  declarations: [
    LoadingComponent,
    StarComponent,
    ObjectsMakeComponent,
    ObjectsShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoadingComponent,
    StarComponent,
    ObjectsMakeComponent,
    ObjectsShowComponent
  ]
})
export class SharedModule { }
