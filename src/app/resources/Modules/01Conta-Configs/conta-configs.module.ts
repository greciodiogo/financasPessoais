import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { ContaConfigsRoutingModule } from './conta-configs-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { NgbCarouselModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { ContaConfigsComponent } from './pages/conta-configs/conta-configs.component';

@NgModule({
  imports: [
    CommonModule,
    ContaConfigsRoutingModule,
    BoxModule,
    FormsModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule,
    ArchwizardModule,
    SharedGlobalModule,
    NgbDatepickerModule
  ],
  declarations: [ContaConfigsComponent,]
})
export class ContaConfigsModule { }
