import { NgModule } from '@angular/core';

import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './00Login/login.component'; 
import { SignUpComponent } from './01Signup/sign-up.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CommonModule } from '@angular/common';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
@NgModule({
  declarations: [LoginComponent, SignUpComponent, RecoveryPasswordComponent, VerifyCodeComponent],
  imports: [
    CommonModule, 
    SharedGlobalModule,
    SharedMaterialModule,
    AuthenticationRoutingModule,
    ArchwizardModule
  ], 
  providers: [
  ]
})
export class AuthenticationModule {}
