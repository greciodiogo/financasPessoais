import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { LoginService } from '@core/security/authentication/login.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { WebSocketService } from '@app/core/services/web-socket';
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
    public authenticated: AuthService,
    public webSocketService: WebSocketService,
  ) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
  
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.webSocketService.connection('notification');
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
          this.loginWsNotification()
          //location.reload();
          window.location.replace(this.returnUrl);
        },
        error => {
          //console.log('status',error);
          this.loading = false;
        });
  }

  loginWsNotification(){
    this.webSocketService.sendCall('LOGIN', {
      username: this.loginForm.value.username,
      created_at: new Date(),
    })
  }

}
