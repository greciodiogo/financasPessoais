import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Dashboard",
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
export class DashboardRoutingModule {}
