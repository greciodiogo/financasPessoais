import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { HistoricoTransacoesComponent } from './pages/historico-transacoes.component';

const routes: Routes = [
  {
    path: 'historico-transacoes',
    component: HistoricoTransacoesComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Histórico de Transações",
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
export class HistoricoTransacoesRoutingModule {}
