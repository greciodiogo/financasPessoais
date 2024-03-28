import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
} from "@angular/core";
import { DashboardService } from "@app/shared/services/dashboard.service";


@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.css"],
})
export class MenuItemComponent {
  @Input() itemTitle: string = "Receber" 
  @Input() iconeTitle: string = "income.png" 
  @Output() public click = new EventEmitter<any>();

  constructor() {}

  onClick() {
    this.click.emit();
  }
}
