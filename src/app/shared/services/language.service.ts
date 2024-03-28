// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public lang = localStorage.getItem('lang')
  private currentLanguageSubject = new BehaviorSubject<string>(this.lang);
  currentLanguage$ = this.currentLanguageSubject.asObservable();
  
  setLanguage(language: string) {
    this.currentLanguageSubject.next(language);
  }
}