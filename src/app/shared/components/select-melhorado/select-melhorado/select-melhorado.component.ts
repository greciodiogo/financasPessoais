import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from "@app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-select-melhorado",
  templateUrl: "./select-melhorado.component.html",
  styleUrls: ['./select-melhorado.component.css'],

})
export class SelectMelhoradoComponent implements OnInit {
  
  @Input() title: string = '';
  @Input() optionData: [] 
  @Input() selectType: any
  @Input() placeholder: string = '';
  @Output() selectTypeChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    public languageservice: LanguageService,
    public translate: TranslateService
  ){}

  ngOnInit() {
    this.languageservice.currentLanguage$.subscribe((language) => {
      this.translate.use(language);
    });
  }

    showOptions = false;
    isDropdownActive: boolean = false;
  
    toggleDropdown(){
      this.isDropdownActive = !this.isDropdownActive
    }

    setState(option){
      this.showOptions = false;
      this.selectType = option
      this.selectTypeChange.emit(this.selectType); 
    }

}