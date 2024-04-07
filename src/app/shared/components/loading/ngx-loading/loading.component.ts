import { Component, ViewChild, TemplateRef, Input } from "@angular/core";
import { ngxLoadingAnimationTypes } from "ngx-loading";

// import { LanguageService } from "@app/shared/services/language.service";
// import { TranslateService } from "@ngx-translate/core";

const PrimaryWhite = "#ffffff";
const SecondaryGrey = "#ccc";
@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent {
  // get aguarde(): string {
  //   this.translate.setDefaultLang(localStorage.getItem("lang"));
  //   this.translate.use(localStorage.getItem("lang"));
  //   return this.translate.instant("loading.aguarde");
  // }

  // get loading(): string {
  //   this.translate.setDefaultLang(localStorage.getItem("lang"));
  //   this.translate.use(localStorage.getItem("lang"));
  //   return this.translate.instant("loading.acarregar");
  // }

  @Input() show: boolean = true;
  // @Input() title?: string = this.aguarde;
  // @Input() subTitle: string = this.loading;
  @Input() titleFontSize: number = 28;
  @Input() subTitleFontSize: number = 23;
  public animationTypestionTypes = ngxLoadingAnimationTypes;
  @Input() animationType: string = null;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  @ViewChild("customLoadingTemplate", { static: false })
  public circle = "circle";
  customLoadingTemplate: TemplateRef<any>;
  constructor(
    // public languageservice: LanguageService,
    // public translate: TranslateService
  ) {}

  ngOnInit(): void {
    // this.languageservice.currentLanguage$.subscribe((language) => {
    //   this.translate.use(language);
    // });
  }
}
