import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { map, finalize } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseStorageService{

  private route:string =`transacoes`;
  public loading:boolean=false
  private apiUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert';
  private apiUrl2 = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'b679ec4e1dmsh00851a579aef8a4p12ee3ejsnbc8a1bbb852f',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
  });
  constructor(protected http: ApiService,private httpclient: HttpClient, public Permission: PermissionService) {
    super(`transacoes`);
  }

  public getDashboardByClienteId(ano: any): Observable<any> {
    if (ano == 0) {
      this.loading = true;
    }
    return this.http.get(`${this.route}/getInfoDashboard?ano=${ano}`).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );  
  }

  public getDashboardInit(): Observable<any> {
      this.loading = true;
    return this.http.get(`transacoes/getDashboardInit`).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  public findDefaultUser(): Observable<any> {
      this.loading = true;
    return this.http.get(`contas/findDefaultConta`).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  public getTransacaoTipos(): Observable<any> {
      this.loading = true;
    return this.http.get(`transacao_tipos`).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  public findAllTransactions(): Observable<any> {
      this.loading = true;
    return this.http.get(`transacoes`).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  public findAllTransactionsTipos(): Observable<any> {
      this.loading = true;
    return this.http.get(`transacao_tipos`).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  public createMultiplasTransacoes(body: any): Observable<any> {
      this.loading = true;
      return this.http.post(`transacoes/createMultiplasTransacoes`, body).pipe(finalize(() => {
      //this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  getConversionRates(fromCurrency: string, toCurrencies: string[],amount): Observable<any> {
    const url = `${this.apiUrl}?from=${fromCurrency}&to=${toCurrencies.join(',')}&amount=${amount}`;
    return this.httpclient.get(url, { headers: this.headers });
  }
}
  