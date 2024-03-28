import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './00Login/login.component'; 
import { SignUpComponent } from './01Signup/sign-up.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: {
      title: 'signup', 
    }
  },
  {
    path: 'recuperar',
    component: RecoveryPasswordComponent,
    data: {
      title: 'recuperar', 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}

