import { Component, Input, OnInit } from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";

import { LanguageService } from "@app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.css"],
})
export class BoxComponent implements OnInit {
  @Input() boxLink = {
    url: null,
    name: "",
    permission: true,
  };

  @Input() boxIcon: string;
  @Input() boxText: string = "FFFFFFFFFFF";
  @Input() boxNumber: any;
  @Input() simpleNumber: boolean = false;
  @Input() boxColor: string = "bg-aqua";
  @Input() loading: boolean = true;
  @Input() visible: boolean = false;

  @Input() extraText: string = null;
  @Input() linkTextAlign: string = "text-center";

  animation = "pulse";

  constructor(
    public fnService: FnService,
    public languageservice: LanguageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.languageservice.currentLanguage$.subscribe((language) => {
      this.translate.use(language);
    });
  }
}
