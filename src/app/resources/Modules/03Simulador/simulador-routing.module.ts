import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { SimuladorComponent } from './simulador.component';

const routes: Routes = [
  {
    path: 'simulador',
    component: SimuladorComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Simulador",
      expectedPermission: "dashboard",
      layout:{
        customLayout: true,
        layoutNavigationTop: true,
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimuladorRoutingModule {}
