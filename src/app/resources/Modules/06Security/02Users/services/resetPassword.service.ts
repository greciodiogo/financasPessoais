import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
 
@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService extends BaseStorageService {

  constructor(protected http: ApiService) {
    super(`auth`);
  }

  resetPassword(form: FormGroup) {
    return this.store(form, '/password/resetByUserAuth');
  }

}
