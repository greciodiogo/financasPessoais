import { Injectable } from '@angular/core';
import { ApiService } from '@providers/api.service';
import { map, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loading:boolean=false

  constructor(private api: ApiService, private auth: AuthService) {}

  /**
   *
   * @param username
   * @param password
   *
   * Descricao: recebe 2 parametros retorna um data
   */
  public login(username, password) {
    return this.api.post('security/auth/login', { username, password }, false).pipe(
      finalize(() => {}),
      map((response) => {
        const data = response.data;
        // login successful if there's a jwt token in the response
        if (data) {
          localStorage.setItem('frase','0')
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.auth.setItemLocalStorage(data);
          //this.router.navigate([this.returnUrl]);
          //window.location.replace(this.returnUrl);
        }
      })
    );
  }

  public signup(requestData) {
    return this.api.post('security/auth/signup', requestData, false).pipe(
      finalize(() => {}),
      map((response) => {
        const data = response.data;
        if (data) {
          localStorage.setItem('frase','0')
          this.auth.setItemLocalStorage({
            ...data,
            user: {
              ...data.user,
              hasUserAccount: false
            }
          });
        }
      })
    );
  }
    
  public findMember(userDetail: string): Observable<any> {
    this.loading = true;
  return this.api.get(`usuarios/findMember/${userDetail}`).pipe(finalize(() => {
    //this.loading = false;
  }), map((data) => Object(data).data)
  );
}
  }
