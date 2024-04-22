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
export class ContaService extends BaseStorageService{

  private route:string =`transacoes`;
  public loading:boolean=false

  constructor(protected http: ApiService, public Permission: PermissionService) {
    super(`usuarios/findLoggedUserDetalhes`);
  }

}
  