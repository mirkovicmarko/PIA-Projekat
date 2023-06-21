import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';

import { SharedModule } from '@shared/shared.module';
import { FeaturesModule } from '@features/features.module';


@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesModule,
    CoreRoutingModule
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule { }
