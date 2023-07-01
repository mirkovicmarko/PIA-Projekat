import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { RequestJobComponent } from './request-job/request-job.component';


const routes: Routes = [
    {
      path: 'agencies',
      children: [
        {
          path: 'list',
          component: ListComponent
        },
        {
          path: 'show',
          component: ShowComponent
        },
        {
          path: 'request_job',
          component: RequestJobComponent
        }
      ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
