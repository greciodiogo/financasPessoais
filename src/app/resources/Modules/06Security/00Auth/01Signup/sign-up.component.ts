import {Component, OnInit, Output, ViewChild} from '@angular/core'; 
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators'; 
import { AuthService } from '@app/core/security/authentication/auth.service'; 
import { WizardComponent } from 'angular-archwizard';
import { UserService } from '../../02Users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
import { LoginService } from '@app/core/security/authentication/login.service';
export interface Cliente {
  first_name?: string;
  last_name?: string;
  email?: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild(VerifyCodeComponent, { static: true })
  public verifyCodeComponent: VerifyCodeComponent;


  
  user
  signupForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  telephone;
  password;
  cliente: Cliente = {};
  showModal: any;
  hide = true;
  hide2 = true;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    public userService: UserService,
    private router: Router,
    public auth: AuthService, 
    public login: LoginService
  ) { 
    
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      name: [''],
      username: [''],
      email: [''],
      telephone: [null],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required],
      country_code: [null],
    }); 
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }


  sendCodeToPhone(){ 
    if(this.signupForm.value.password == this.signupForm.value.confirmpassword){
      if(this.showModal == 1) this.showModal = 2;
        // this.clienteService.sendCodeTo([this.telephone]).subscribe(
          // (response) => {
          //   // this.verifyCodeComponent.startMinute()
          //   this.password = this.signupForm.value.password;           
          // },
          // (error) => {
          //   console.log(error)
          // }
        // )
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As Senhas não coincidem, verificar e informar novamente",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    } 
  }

  public autenticate(user: any) {
    this.login.login(user.telephone, user.password)
      .pipe(first(), finalize(() => { }))
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        });
  }

  public async registerClient(user: any) {
    this.userService.store(user).subscribe(
      (response) => {   
        this.autenticate(this.user);
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
