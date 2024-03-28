import {
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
import { DashboardService } from "@app/shared/services/dashboard.service";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.css"],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  
  public dashboard: any = {
    countPoupancas: 0,
    valorPoupancas: 0,
    countReceitas: 0,
    valorReceitas: 0,
    countDespesas: 0,
    valorDespesas: 0
  };

  public loadingDade = false;

  constructor(
    public dashboardService: DashboardService,
    public configService: FnService,
  ) {}

  ngOnInit() {
    this.getDashboardInit()
  }

  ngOnDestroy(): void {}

  
  public getDashboardInit(){
    this.dashboardService.loading = true
    this.dashboardService.getDashboardInit().subscribe(
      (response)=>{
        this.dashboard = response
        this.dashboardService.loading = false
    },
    (error) => (this.dashboardService.loading = false)
    )
  }

}
