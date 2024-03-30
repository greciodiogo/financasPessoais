import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { map, finalize } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseStorageService{

  private route:string =`transacoes`;
  public loading:boolean=false
  constructor(protected http: ApiService, public Permission: PermissionService) {
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
}
  