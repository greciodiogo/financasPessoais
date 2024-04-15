import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { UserPainelComponent } from './pages/user-painel/user-painel.component';
import { UserContasComponent } from './pages/user-contas/user-contas.component';

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
  },
  {
    path: 'user-panel/user-contas',
    component: UserContasComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Contas do Usuário",
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
