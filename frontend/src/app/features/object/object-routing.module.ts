import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: 'objects',
    children: [
      {
        path: 'new',
        component: UpsertComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'change',
        component: UpsertComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectRoutingModule { }
