import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/security/guards/auth.guard';
import { P403Component } from './resources/errors/403.component';
// Import Containers

import { P404Component } from './resources/errors/404.component';
import { P500Component } from './resources/errors/500.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
      layout: { customLayout: false, layoutNavigationTop: false },
    },
  },
  {
    path: '403',
    component: P403Component,
    canActivate: [AuthGuard],
    data: {
      title: 'Page 403',
      layout: { customLayout: false, layoutNavigationTop: false },
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
      layout: { customLayout: false, layoutNavigationTop: false },
    },
  },
  {
    path: '',
    data: {
      layout: { customLayout: false, layoutNavigationTop: true },
    },

    loadChildren: () => import('./resources/Modules/00Dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'definicoes',
    data: {
      title: 'definicoes', 
      layout: { customLayout: false, layoutNavigationTop: true },
    },
    loadChildren: () => import('./resources/Modules/moduleSys.module').then((m) => m.ModuleSysModule),
  },
  {
    path: '',
    data: {
      title: 'Simulador',
    },
    loadChildren: () =>
      import('./resources/Modules/03Simulador/simulador.module').then(
        (m) => m.SimuladorModule
      ),
  },
  {
    path: '',
    data: {
      title: 'Login',
    },
    children: [
      {
        path: 'login',
        data: {
          title: 'Login',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './resources/Modules/06Security/00Auth/authentication.module'
          ).then((m) => m.AuthenticationModule),
      },
    ],
  },
  {
    path: '',
    data: {
      title: 'signup', 
      layout: { customLayout: false, layoutNavigationTop: true },
    },
    loadChildren: () => import('./resources/Modules/06Security/00Auth/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
      layout: { customLayout: false, layoutNavigationTop: true },
    },
  }, 
   {
    path: '**',
    component: P404Component,
    data: {
      title: 'Page 404',
      layout: { customLayout: false, layoutNavigationTop: true },
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
