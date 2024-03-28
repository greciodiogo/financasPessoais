import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
import { GraficoComponent } from "../components/grafico/grafico.component";
import { DashboardService } from "@app/shared/services/dashboard.service";

import { Transaction } from "../interfaces/transaction";
import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from "rxjs";
import { MoneyControlFormComponent } from "../components/money-control-form/money-control-form.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  
  @Output() public close = new EventEmitter<any>();
  
  @ViewChild(GraficoComponent, { static: true })
  public graficoComponent: GraficoComponent;


  public transactionData: any
  public lastTransaction: any
  
  public pagination = new Pagination();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

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
  formType: number = 1

  constructor(
    public dashboardService: DashboardService,
    public configService: FnService,
  ) {}

  public getDashboardInit() {
    // this.dashboardService.getDashboardByClienteId(this.data).subscribe(
    //   (data) => {
    //     setTimeout(() => {
    //       // Atualizar o valor dentro da zona Angular
    //       this.ngZone.run(() => {
    //         this.dashboard = data;
    //         this.dashboardService.loading = false;
    //         this.graficoComponent.chartts(this.dashboard?.qtdFacturasMes);
    //         this.cdr.detectChanges(); // Forçar a detecção de mudanças
    //       });
    //     }, 2000);
    //   },
    //   (error) => (this.dashboardService.loading = false)
    // );
  }

  ngOnInit() {
    this.getDashboardInit();
    this.findDefaultUser()
    this.findAllTransactions()
  }

  ngOnDestroy(): void {}

  public activePosition: boolean = false;
  public diaMes  = `${new Date().getDate()} / ${new Date().getMonth() + 1}`

  toggleRecieveBtn(type): void {
    this.activePosition = true;
    this.setFormTitle(type)
  }

  onClose() {
    this.activePosition = false;
  }

  setFormTitle(type: number){
    this.formType = type;
  }

  public dataHora = new Date();
  public dataFormatada = `${this.dataHora.getDate().toString().padStart(2, "0")}.${(this.dataHora.getMonth() + 1).toString().padStart(2, "0")}.${this.dataHora.getFullYear()} ${this.dataHora.getHours().toString().padStart(2, "0")}:${this.dataHora.getMinutes().toString().padStart(2, "0")}:${this.dataHora.getSeconds().toString().padStart(2, "0")}`;
  
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

  public findDefaultUser(){
    this.dashboardService.loading = true
    this.dashboardService.findDefaultUser().subscribe(
      (response)=>{
        this.userSession = response;
        this.dashboardService.loading = false
    },
    (error) => (this.dashboardService.loading = false)
    )
  }

  public findAllTransactions(){
    this.dashboardService.loading = true
    this.dashboardService.findAllTransactions().subscribe(
      (response)=>{
        this.transactionData = response;
        this.pagination.page = response.page;
        this.pagination.perPage = response.perPage;
        this.pagination.lastPage = response.lastPage;
        this.pagination.total = response.total;
        
        this.lastTransaction =response?.data[0]
        this.dashboardService.loading = false
      },
      (error) => (this.dashboardService.loading = false)
      )
    }
    public getPageFilterData(page: number) {
      if (this.pagination.perPage == null) {
        return;
      }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }
  slides = [{},{}
    // { template: this.estatisticaTemplate }, // Template para Estatística
    // { template: this.movimentosTemplate }   // Template para Últimos Movimentos
  ];

  // currentIndex = 0;
  // slideInterval = 8000; // 8 segundos
  
  @ViewChild(MoneyControlFormComponent, { static: true })
  public moneyControlFormComponent: MoneyControlFormComponent;
  handleEditTransaction(transaction){
    this.moneyControlFormComponent.setTransaction(transaction)
    this.toggleRecieveBtn(3)
  }
}
