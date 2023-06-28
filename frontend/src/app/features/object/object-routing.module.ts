import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: 'objects',
    children: [
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectRoutingModule { }
