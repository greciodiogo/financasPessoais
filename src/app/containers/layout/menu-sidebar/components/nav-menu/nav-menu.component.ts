import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { LanguageService } from "@app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {

  @Input() public currentUser:any
  @Input() public authenticated: AuthService
  @Input() public layoutNavigationTop:boolean = true;

  constructor(
    public auth: AuthService, 
    // public languageservice:LanguageService,
    // public translate:TranslateService
    ) { }
    ngOnInit() {
      // this.languageservice.currentLanguage$.subscribe((language) => {
      //   this.translate.use(language);
      // });
    }
}
