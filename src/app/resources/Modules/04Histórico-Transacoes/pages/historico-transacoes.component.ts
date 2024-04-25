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
import { DashboardService } from "@app/shared/services/dashboard.service";

import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from "rxjs";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { Store } from "@ngrx/store";
import { loadtransaction, loadtransactionsuccess } from "@app/resources/Store/Repositorio/Repositorio.Action";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-historico-transacoes",
  templateUrl: "./historico-transacoes.component.html",
  styleUrls: ["./historico-transacoes.component.css"],
})
export class HistoricoTransacoesComponent implements OnInit, OnDestroy {
  
  @Output() public close = new EventEmitter<any>();

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
    
    public authenticated: AuthService,
    public dashboardService: DashboardService,
    public configService: FnService,
    private store: Store,
    public config: NgbCarouselConfig
  ) {
    config.interval = 6000;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.store.dispatch(loadtransaction());
    this.store.select(loadtransactionsuccess).subscribe(response => {
      if (response.transaction.data.length > 0) {
        this.transactionData = response.transaction
        this.totalDisponivel = response.transaction.data[0].conta.saldo_actual;
        this.lastTransaction = response.transaction.data[0];
      } 
    })
  }

  ngOnDestroy(): void {}

  public activePosition: boolean = false;
  public activeMultipleTransactionForm: boolean = false;

  toggleRecieveBtn(type): void {
    this.activePosition = true;
    this.setFormTitle(type)
  }

  toggleMultpileTransaction(): void {
    this.activeMultipleTransactionForm = true
  }

  onClose() {
    this.activePosition = false;
  }

  onCloseModal() {
    this.activeMultipleTransactionForm = false;
  }

  setFormTitle(type: number){
    this.formType = type;
  }

  public dataHora = new Date();
  public dataFormatada = `${this.dataHora.getDate().toString().padStart(2, "0")}.${(this.dataHora.getMonth() + 1).toString().padStart(2, "0")}.${this.dataHora.getFullYear()} ${this.dataHora.getHours().toString().padStart(2, "0")}:${this.dataHora.getMinutes().toString().padStart(2, "0")}:${this.dataHora.getSeconds().toString().padStart(2, "0")}`;
  
  public userSession = {
      nome: ""
  }

    public getPageFilterData(page: number) {
      if (this.pagination.perPage == null) {
        return;
      }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public totalDisponivel: any ;
 
}
