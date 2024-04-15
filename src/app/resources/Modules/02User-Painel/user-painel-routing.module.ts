import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { UserPainelComponent } from './pages/user-painel.component';

const routes: Routes = [
  {
    path: 'user-panel',
    component: UserPainelComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Painel do Usuário",
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
export class UserPainelRoutingModule {}
