import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from '@core/providers/api.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FnService { 
  public permission: PermissionService = new PermissionService(
    new AuthService(null, null, null)
  );
  constructor(public httpclient: HttpClient, public toasterService: ToastrService) { }


private apiUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'b679ec4e1dmsh00851a579aef8a4p12ee3ejsnbc8a1bbb852f',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
  });

  getAmountConverted(fromCurrency: string, toCurrencies: string[],amount): Observable<any> {
    const url = `${this.apiUrl}?from=${fromCurrency}&to=${toCurrencies.join(',')}&amount=${amount}`;
    return this.httpclient.get(url, { headers: this.headers });
  }

}