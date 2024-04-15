import {Component, OnInit, TemplateRef, ViewEncapsulation, inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { LoginService } from '@core/security/authentication/login.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { WebSocketService } from '@app/core/services/web-socket';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-conta-configs',
  templateUrl: 'conta-configs.component.html',
  styleUrls: ['conta-configs.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [ToasterService]
})
export class ContaConfigsComponent implements OnInit {
  
  contaForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public memberDetail 
  constructor(
    private formBuilder: UntypedFormBuilder,
    public auth: AuthService,
    public userService: LoginService,
    private route: ActivatedRoute, 
    public authenticated: AuthService,
    public webSocketService: WebSocketService,
    public toasterService: ToastrService,
    public contaService: ContaService
  ) {}
  
  
  ngOnInit() {
    this.contaForm = this.formBuilder.group({
      id: [{value:null, disabled:true}],
      contaDescricao: [null],
      moeda_id: [1],
    });
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.webSocketService.connection('notification');
  }
  
  // convenience getter for easy access to form fields
  get f() {
    return this.contaForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.contaForm.invalid) {
      return;
    }
    this.loading = true;
    const id = this.contaForm.getRawValue().id;

    // TODO: usado para fazer a requisição com a api de criação de objsct or update

    this.createOrEdit(this.contaForm, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object

    this.contaService.loading = true;
    this.contaService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          if (isCreate) {
            formulario.reset();
          }
          this.contaService.loading = false;
          window.location.replace(this.returnUrl);
        },
        (error) => {
          this.submitted = false;
          this.contaService.loading = false;
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.contaForm.reset();
  }


  loginWsNotification(){
    this.webSocketService.sendCall('LOGIN', {
      username: this.contaForm.value.username,
      created_at: new Date(),
    })
  }

  private modalService = inject(NgbModal);
	closeResult = '';

  openModal(){}

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  public contaMembers = []
  public findUser(userDetail){
    this.userService.findMember(userDetail).subscribe(
      (response) => {
        if (this.isMemberInArray(response)) {
        this.toasterService.warning(`'O usuário já foi adicionado a lista'`);
        return
        } 
        this.contaMembers.push(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public removeUser(index: number): void {
    this.contaMembers.splice(index, 1);
  }

  private isMemberInArray(member: any): boolean {
    return this.contaMembers.some(existingMember => existingMember.id === member.id);
  }

}
