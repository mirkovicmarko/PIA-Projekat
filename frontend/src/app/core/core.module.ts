import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FeaturesModule } from '@features/features.module';


@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    FeaturesModule
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule { }
