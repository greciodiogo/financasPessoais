import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { GraficoComponent } from './components/grafico/grafico.component';
import { GraficoPizzaComponent } from './components/grafico-pizza/grafico-pizza.component';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SimuladorRoutingModule } from './simulador-routing.module';
import { SimuladorComponent } from './simulador.component';
import { BarraProgressoComponent } from './components/barra-progresso/barra-progresso.component';
@NgModule({
  imports: [
    SimuladorRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
  ],
  declarations: [ SimuladorComponent, BarraProgressoComponent, GraficoComponent, GraficoPizzaComponent ]
})
export class SimuladorModule { }
