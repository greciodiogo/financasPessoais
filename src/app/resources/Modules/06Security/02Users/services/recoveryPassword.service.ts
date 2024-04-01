import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
 
@Injectable({
  providedIn: 'root',
})
export class RecoveryPasswordService extends BaseStorageService {

  constructor(protected http: ApiService) {
    super(`auth`);
  }

  recoveryPassword(form: UntypedFormGroup) {
    return this.store(form, '/password/resetByUserAuth');
  }

}
