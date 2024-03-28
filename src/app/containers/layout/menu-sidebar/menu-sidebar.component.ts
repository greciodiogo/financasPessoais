import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { environment as env } from '@env/environment';

@Component({
  selector: "app-menu-sidebar",
  templateUrl: "./menu-sidebar.component.html",
  styleUrls: ['./menu-sidebar.component.css'],
})
export class MenuSidebarComponent implements OnInit {

  @Input() public currentUser:any
  @Input() public authenticated: AuthService
  @Input() public layoutNavigationTop:boolean = true;
  public subscriptions = [];
  public layout = {
    customLayout: true,
        layoutNavigationTop: true
  };

  constructor(public auth: AuthService) { }
  ngOnInit() {}


}
