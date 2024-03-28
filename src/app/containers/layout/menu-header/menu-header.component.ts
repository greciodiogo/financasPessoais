import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { ConnectionMonitoringService } from "@app/shared/components/connection/connection-monitoring.service";
import { environment as env } from '@env/environment';

@Component({
  selector: "app-menu-header",
  templateUrl: "./menu-header.component.html",
  styleUrls: ['./menu-header.component.css'],
})
export class MenuHeaderComponent implements OnInit {

  @Input() public currentUser:any
  @Input() public authenticated: AuthService
  @Input() public layoutNavigationTop:boolean = true;
  public subscriptions = [];
  public layout = {
    customLayout: true,
        layoutNavigationTop: true
  };

  constructor(public auth: AuthService, public connectionService: ConnectionMonitoringService) { }
  ngOnInit() {}


}
