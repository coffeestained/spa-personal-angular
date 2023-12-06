import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './component/maps.component';
import { Route, RouterModule } from '@angular/router';

export const remoteRoutes: Route[] = [
  { path: '', component: MapsComponent },   // Add route
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes)    // forChild
  ]
})
export class AppRoutingModule { }
