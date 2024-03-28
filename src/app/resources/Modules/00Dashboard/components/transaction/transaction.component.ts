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

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})

export class TransactionComponent implements OnInit {
  
  @Input() transaction: any
  @Input() largeSize: boolean = false;
  public imageTitle = "income.png"
  public transactionData
  public categoriasTransaction

  constructor(
    public configService: FnService,
    public dashboardService: DashboardService
    // public languageservice: LanguageService,
    // public translate: TranslateService,

  ) {}

  ngOnInit() {
    // this.languageservice.currentLanguage$.subscribe((language) => {
    //   this.translate.use(language);
    // });
  }

}
