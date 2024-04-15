import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { UserPainelComponent } from './pages/user-painel/user-painel.component';
import { UserPainelRoutingModule } from './user-painel-routing.module';
import { UserContasComponent } from './pages/user-contas/user-contas.component';

@NgModule({
  imports: [
    UserPainelRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
  ],
  declarations: [UserPainelComponent,UserContasComponent]
})
export class UserPainelModule { }
