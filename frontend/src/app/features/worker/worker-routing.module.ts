import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpsertComponent } from './upsert/upsert.component';
import { AllComponent } from './all/all.component';
import { RequestMoreComponent } from './request-more/request-more.component';

const routes: Routes = [
  {
    path: 'workers',
    children: [
      {
        path: 'insert',
        component: UpsertComponent
      },
      {
        path: 'edit',
        component: UpsertComponent
      },
      {
        path: 'all',
        component: AllComponent
      },
      {
        path: 'request_more',
        component: RequestMoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
