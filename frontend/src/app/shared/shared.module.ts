import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './ui/loading/loading.component';
import { StarComponent } from './ui/star/star.component';
import { FormsModule } from '@angular/forms';
import { ObjectsMakeComponent } from './ui/objects-make/objects-make.component';
import { ObjectsShowComponent } from './ui/objects-show/objects-show.component';
import { ListComponent } from './ui/list/list.component';
import { ItemComponent } from './ui/list/item/item.component';
import { ObjectsWorkerAllocationComponent } from './ui/objects-worker-allocation/objects-worker-allocation.component';
import { ModalWindowComponent } from './ui/modal-window/modal-window.component';
import { ObjectsChangeConstructionStatusComponent } from './ui/objects-change-construction-status/objects-change-construction-status.component';


@NgModule({
  declarations: [
    LoadingComponent,
    StarComponent,
    ObjectsMakeComponent,
    ObjectsShowComponent,
    ListComponent,
    ItemComponent,
    ObjectsWorkerAllocationComponent,
    ModalWindowComponent,
    ObjectsChangeConstructionStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoadingComponent,
    StarComponent,
    ObjectsMakeComponent,
    ObjectsShowComponent,
    ListComponent,
    ItemComponent,
    ObjectsWorkerAllocationComponent,
    ModalWindowComponent,
    ObjectsChangeConstructionStatusComponent
  ]
})
export class SharedModule { }
