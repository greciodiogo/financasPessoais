import {Component, OnInit, TemplateRef, ViewEncapsulation, inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { LoginService } from '@core/security/authentication/login.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { WebSocketService } from '@app/core/services/web-socket';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-conta-configs',
  templateUrl: 'conta-configs.component.html',
  styleUrls: ['conta-configs.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [ToasterService]
})
export class ContaConfigsComponent implements OnInit {
  
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
  ) {}
  
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null],
      name: [null],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.webSocketService.connection('notification');
  }
  
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }


  loginWsNotification(){
    this.webSocketService.sendCall('LOGIN', {
      username: this.loginForm.value.username,
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

}
