import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
// import { LanguageService } from "@app/shared/services/language.service";
// import { TranslateService } from "@ngx-translate/core";
import { Transaction } from "../../interfaces/transaction";
import { DashboardService } from '@app/shared/services/dashboard.service';
import { Observable, Subject } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { HistoricoTransacoesComponent } from "../../pages/historico-transacoes.component";
import { Store } from '@ngrx/store';
import { loadtransaction, loadtransactionsuccess } from "@app/resources/Store/Repositorio/Repositorio.Action";

@Component({
  selector: "app-transaction-full",
  templateUrl: "./transaction-full.component.html",
  styleUrls: ["./transaction-full.component.css"],
})

export class TransactionFullComponent implements OnInit {
  
  public transactionData: any = []
  @Input() largeSize: boolean = false;
  @Input() authenticated
  @Output() public handleEdit = new EventEmitter<any>();
  @Output() public loadList = new EventEmitter<any>();

  @ViewChild(HistoricoTransacoesComponent, { static: true })
  public historicoTransacoesComponent: HistoricoTransacoesComponent;

  public imageTitle = "income.png"
  public categoriasTransaction
  
  public pagination: Pagination
  
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public configService: FnService,
    public dashboardService: DashboardService,
    private store: Store
    // public languageservice: LanguageService,
    // public translate: TranslateService,

  ) {}

  ngOnInit() {
    // this.languageservice.currentLanguage$.subscribe((language) => {
    //   this.translate.use(language);
    // });
    this.store.dispatch(loadtransaction());
    this.store.select(loadtransactionsuccess).subscribe(response => {
      if (response.transaction && response.transaction.data.length > 0) {
        this.transactionData= response.transaction
        this.pagination = {
          page: response.transaction.page,
          perPage: response.transaction.perPage,
          lastPage: response.transaction.lastPage,
          total: response.transaction.total
        }
      } 
    })
  }

  public transactionTitle = ""

  public getPageFilterData(page) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public onHandleEdit(data){
    this.handleEdit.emit(data)
  }
}

