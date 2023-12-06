import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './component/maps.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './maps-routing.module';

@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class MapsModule { }
