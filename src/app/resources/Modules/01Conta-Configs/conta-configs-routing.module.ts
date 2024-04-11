import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { ContaConfigsComponent } from './pages/conta-configs/conta-configs.component';

const routes: Routes = [
  {
    path: 'configuracoes-conta',
    component: ContaConfigsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Configurações da Conta",
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
export class ContaConfigsRoutingModule {}
