import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ViewChild,
  SimpleChange,
} from "@angular/core";
import { PermissionService } from "@app/core/security/authentication/permission.service";
import { FnService } from "@app/shared/services/fn.helper.service";
import { GraficoComponent } from "./components/grafico/grafico.component";
import { GraficoPizzaComponent } from "./components/grafico-pizza/grafico-pizza.component";
import { DashboardService } from "@app/shared/services/dashboard.service";

import { LanguageService } from "@app/shared/services/language.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-simulador",
  templateUrl: "./simulador.component.html",
  styleUrls: ["./simulador.component.css"],
})
export class SimuladorComponent implements OnInit, OnDestroy {
  @ViewChild(GraficoComponent, { static: true })
  public graficoComponent: GraficoComponent;

  @ViewChild(GraficoPizzaComponent, { static: true })
  public graficoPizzaComponent: GraficoPizzaComponent;

  public data = 0;

  public dashboard: any = {
    pagas: 0,
    dividas: 0,
    qtdfaturas: 0,
    servicos: 0,
    qtdCompras: 0,
    qtdFacturasMes: [],
    qtdpagamentos:0,
  };

  public users: any;
  public userData = JSON.parse(localStorage?.getItem("accessToken"));

  public loadingDade = false;

  public log: Array<Object> = new Array<Object>();

  // *************************
    form:   UntypedFormGroup;
    valorFinanciamento: number = 200000;
    prazoFinanciamento: number = 3;
    taxaJurosAnual: number = 1000;
    pagamentoMensal: number = 0;

    valorInput: number = 0

  // *************************

  constructor(
    public dashboardService: DashboardService,
    private permission: PermissionService,
    public configService: FnService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public languageservice: LanguageService,
    private fb: UntypedFormBuilder
  ) {  }


  ngOnInit() {
    this.form = this.fb.group({
      valorFinanciamento: [this.valorFinanciamento, Validators.required],
      prazoFinanciamento: [this.prazoFinanciamento, Validators.required],
      pagamentoMensal: [null],
      taxaJurosAnual: [this.taxaJurosAnual, Validators.required],
      
    });
  }

  calcularPagamentoMensal() {
    // this.pagamentoMensal = (this.valorFinanciamento * this.taxaJurosAnual / 100) / (1 - (1 + this.taxaJurosAnual / 100)**(-this.prazoFinanciamento));
    // this.valorFinanciamento = this.prazoFinanciamento * this.taxaJurosAnual;
    this.prazoFinanciamento = this.valorFinanciamento / this.taxaJurosAnual
  }

  onPrazoFinanciamentoChange(event: any) {
    this.prazoFinanciamento = event.valorAtual;
    this.calcularPagamentoMensal();
  }
  
  onValorFinanciamentoChange(event: any) {
    this.valorFinanciamento = event.valorAtual;
    this.calcularPagamentoMensal();
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.calcularPagamentoMensal()
    console.log(this.valorFinanciamento)
  }

  public userSession = {
    saldo_actual: 0,
    moeda: {
      moeda: "",
      codigo_iso: "",
      descricao: ""
    },
    usuario: {
      nome: ""
    }
  }
}
