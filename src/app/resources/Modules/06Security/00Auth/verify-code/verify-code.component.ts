import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { UserService } from '../../02Users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@app/core/security/authentication/login.service';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  @ViewChildren('input') inputs: QueryList<ElementRef>;



  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;


  @ViewChild('closeModal') closeModal: ElementRef;

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Verificação de Código';
  @Input() password;
  @Input() telephone;

  loading: boolean = false;



  @Output() private loadList = new EventEmitter<any>();

  submitted: boolean = false;
  validateCodeForm: UntypedFormGroup;
  codeSent: number;
  returnUrl: string;
  code: UntypedFormArray;

  user
  isButtonDisabled: boolean = true;
  countdown: number = 120; // 2 minutos em segundos
  countdownText: string = "";

  constructor(
    private renderer: Renderer2,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public login: LoginService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, this.countdown * 1000); // Multiplica por 1000 para converter segundos para milissegundos

    this.startCountdown();
    this.validateCodeForm = this.formBuilder.group({
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
      code5: ['', Validators.required],
      code6: ['', Validators.required],
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  onReset() {
    this.title = 'Verificação de Código';
    // this.parceirosDados = new Parceiros();
    this.submitted = false;
    this.validateCodeForm.reset();
  }

  next(value: string, nextInput: ElementRef) {
    if (value.length === 1) {
      this.renderer.selectRootElement(nextInput.nativeElement).focus();
    }
  }

  // validarCode() {
  //   this.loading = true
  //   this.user = { telephone: this.telephone, country_code: '+244', password: this.password };
  //   this.codeSent = this.validateCodeForm.value.code1 + this.validateCodeForm.value.code2 + this.validateCodeForm.value.code3 + this.validateCodeForm.value.code4 + this.validateCodeForm.value.code5 + this.validateCodeForm.value.code6;
  //   this.clienteService.confirmClientCode(this.telephone, this.codeSent).subscribe(
  //     async (response) => {
  //       await this.registerClient(this.user);
  //       this.loadList.emit(Object(response).data);
  //       this.closeModal.nativeElement.click();
  //       this.loading = false

  //     },
  //     (error) => {
  //       console.log(error);
  //       this.loading = false

  //     }
  //   )
  // }

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

  public close() {
    this.closeModal.nativeElement.click();
  }


  ngAfterViewInit(): void {
    this.focusOnFirstInput();
  }

  focusOnFirstInput(): void {
    const firstInput = this.inputs.first;
    if (firstInput) {
      firstInput.nativeElement.focus();
    }
  }

  onInputChange(event: any, nextInput: any): void {
    const inputValue = event.target.value;

    if (inputValue.length === 1 && nextInput) {
      nextInput.focus();
    }
  }
  

  onLastInput(event: any): void {
    const lastInputValue = event.target.value;

    // Verifica se todos os inputs estão preenchidos
    const allInputsFilled = this.inputs.toArray().every(input => input.nativeElement.value.length === 1);

    if (lastInputValue.length === 1 && allInputsFilled) {
      // this.validarCode(); // Chama a função desejada
    }
  }

  sendCodeToPhone(){ 
    // this.countdown = 120;
    // this.loading = true
    //     this.clienteService.sendCodeTo(this.telephone).subscribe(
    //       (response) => {
    //         this.loading = false;
    //       },
    //       (error) => {
    //         console.log(error)
    //         this.loading = false
    //       }
    //     )    
  }

  public startMinute(): void{
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, this.countdown * 1000); // Multiplica por 1000 para converter segundos para milissegundos
    this.countdownText = "Reenviar código"
    this.startCountdown();
  }

  private startCountdown(): void {
    setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.formatCountdownText(this.countdown);
      }
    }, 1000);
  }

  private formatCountdownText(countdown: number): void {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    this.countdownText = `${minutes}m ${seconds}s`;
  }
}
