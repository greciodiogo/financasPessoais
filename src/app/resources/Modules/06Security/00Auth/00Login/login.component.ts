import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { LoginService } from '@core/security/authentication/login.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
//import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [ToasterService]
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public auth: AuthService,
    public login: LoginService,
    private router: Router,
    private route: ActivatedRoute, 
  ) {
    if (this.auth.isAuthenticated()) {
      this.redirectUser();
    }
  }
 

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  public autenticate() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.login.login(this.f.username.value, this.f.password.value)
      .pipe(first(), finalize(()=>{ this.loading = false; }))
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          //location.reload();
          this.redirectUser();
        },
        error => {
          //console.log('status',error);
          this.loading = false;
        });
  }

  private redirectUser() {
    if (this.auth.isAuthenticated() && this.auth.user.hasUserAccount) {
      this.router.navigate(['/dashboard']);
    } 
    if (this.auth.isAuthenticated() && !this.auth.user.hasUserAccount) 
      this.router.navigate(['/user-panel']);
    }

}
