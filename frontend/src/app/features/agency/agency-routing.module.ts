import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';


const routes: Routes = [
    {
      path: 'agencies',
      children: [
        {
          path: 'get_all',
          component: ListComponent
        },
        {
          path: 'show',
          component: ShowComponent
        }
      ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
