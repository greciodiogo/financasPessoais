import {Component, OnInit, Output, ViewChild} from '@angular/core'; 
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators'; 
import { AuthService } from '@app/core/security/authentication/auth.service'; 
import { WizardComponent } from 'angular-archwizard';
import { UserService } from '../../02Users/services/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
export interface Cliente {
  first_name?: string;
  last_name?: string;
  email?: string;
  // telefone?: string;
  // morada?: string;
  // nacionalidade?: string;
  // numIdentidade?: string;
  // tipoIdentidade?: string;
  // dispositivo?: string;
  // tipoCliente?: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild(VerifyCodeComponent, { static: true })
  public verifyCodeComponent: VerifyCodeComponent;


  signupForm: FormGroup;
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
    private formBuilder: FormBuilder,
    public userService: UserService,
    public auth: AuthService, 
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

  verifyNumberCliente(){    
    this.userService.loading = true
    this.userService.verifyInfoCliente(this.telephone)
    .pipe(finalize(()=>    this.userService.loading = false ))
    .subscribe(
      (response) => {
        this.retornoInforCliente(response)
        this.signupForm.patchValue({telephone: this.telephone, country_code: '+244'});
        this.showModal = 1;  
      },(error=>{
        this.userService.loading = false;
        this.signupForm.reset();
      })
    )
  }

  retornoInforCliente(data: any) {
    this.cliente.first_name = data.first_name;
    this.cliente.last_name = data.last_name;
    this.cliente.email = data.email;
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
}
