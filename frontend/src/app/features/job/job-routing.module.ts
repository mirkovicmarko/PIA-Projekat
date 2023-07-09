import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { WorkerAllocationComponent } from './worker-allocation/worker-allocation.component';

const routes: Routes = [
  {
    path: 'jobs',
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'worker_allocation',
        component: WorkerAllocationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
