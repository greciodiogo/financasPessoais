import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";

import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from "rxjs";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { Store } from "@ngrx/store";
import { gettransaction, loadtransaction, loadtransactionsuccess } from "@app/resources/Store/Repositorio/Repositorio.Action";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-painel",
  templateUrl: "./user-painel.component.html",
  styleUrls: ["./user-painel.component.css"],
})
export class UserPainelComponent implements OnInit, OnDestroy {
  
  
  @Output() public close = new EventEmitter<any>();
  

  public transactionData: any
  public lastTransaction: any
  
  public pagination = new Pagination();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  public data = 0;

  formType: number = 1

  constructor(
    public authenticated: AuthService,
    public configService: FnService,
    private router: Router,
  ) {
    if (!this.authenticated.user.hasUserAccount) {
      this.router.navigate(['/user-panel'])
    }}

  ngOnInit() {

  }

  ngOnDestroy(): void {}

  public activePosition: boolean = false;
  public activeMultipleTransactionForm: boolean = false;
  public diaMes  = `${new Date().getDate()} / ${new Date().getMonth() + 1}`

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

  public totalDisponivel: any ;
 
}
