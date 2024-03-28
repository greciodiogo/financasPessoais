import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { OnlineStatusService } from "../../services/conectionStatus.service";
import { Router } from '@angular/router';

import { LanguageService } from "@app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"],
})
export class MainHeaderComponent implements OnInit {
  isOnline: boolean;

  @Input() public currentUser: any;
  @Input() public authenticated: AuthService;
  @Input() public layoutNavigationTop: boolean = true;
  public userData = JSON.parse(localStorage?.getItem("accessToken"));
   caminho:string='../../../../assets/img/flags/';
   flag:string=''
  constructor(
    public auth: AuthService,
    private onlineStatusService: OnlineStatusService,
    public languageservice: LanguageService,
    public translate: TranslateService,
    public router: Router

  ) {}
  ngOnInit() {
    this.isOnline = navigator.onLine;

    this.onlineStatusService.statusChanged.subscribe((status: boolean) => {
      this.isOnline = status;
    });
    if (localStorage.getItem("lang") == null) {
      localStorage.setItem("lang", "pt");
      this.languageservice.setLanguage("pt");
    }
    this.flag=localStorage.getItem("lang");
  }
 
  public sendData(data: string){
    localStorage.setItem('isChangePassword',data)
  }

  Translate(lang: any) {
    localStorage.setItem("lang", lang);
    this.languageservice.setLanguage(lang);
    this.flag=localStorage.getItem("lang");
  }
}
