import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { HistoricoTransacoesComponent } from './pages/historico-transacoes.component';
import { HistoricoTransacoesRoutingModule } from './historico-transacoes-routing.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { TransactionFullComponent } from './components/transaction-full/transaction-full.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    HistoricoTransacoesRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule
  ],
  declarations: [ HistoricoTransacoesComponent, TransactionFullComponent]
})
export class HistoricoTransacoesModule { }
