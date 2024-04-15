import {
  Component,
  Input,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";

@Component({
  selector: "app-credit-card",
  templateUrl: "./credit-card.component.html",
  styleUrls: ["./credit-card.component.css"],
})


export class CreditCardComponent {
  @Input() cardTitle:  string = ""
  @Input() totalDisponivel: number = 0
  public diaMes  = `${new Date().getDate()} / ${new Date().getMonth() + 1}`
  constructor(    
    public configService: FnService,
  ) {}
}
