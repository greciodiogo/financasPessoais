import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GraficoComponent } from './components/grafico/grafico.component';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { MoneyControlFormComponent } from './components/money-control-form/money-control-form.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardHomeComponent } from './components/dashboards-home/dashboard-home.component';
import { TransactionFullComponent } from './components/transaction-full/transaction-full.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { MultipleTransactionFormComponent } from './components/multiple-transaction-form/multiple-transaction-form.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    DashboardRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule
  ],
  declarations: [DashboardComponent, SlideShowComponent, MoneyControlFormComponent, MenuItemComponent, TransactionComponent, TransactionFullComponent, DashboardHomeComponent, GraficoComponent, MultipleTransactionFormComponent]
})
export class DashboardModule { }
