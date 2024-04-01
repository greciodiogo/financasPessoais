import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { debounceTime, finalize, map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`users`);
  }

  updateStatus(form: UntypedFormGroup, id){
    return this.update(form, id,"/updateStatus")
  }

  resetPassword(form: UntypedFormGroup,id){
    return this.update(form,id,"/password/resetByUser")
  }

  verifyInfoCliente(telephone: any){
    return this.http.get(`${this.url}/dataValidationCliente?telephone=${telephone}`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    )
  }

  // changePass(form: FormGroup,id){
  //   return this.update(form,`password/resetByUser/${id}`)
  // }
}
