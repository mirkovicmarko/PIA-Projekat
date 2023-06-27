import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: 'objects',
    children: [
      {
        path: 'new',
        component: NewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectRoutingModule { }
