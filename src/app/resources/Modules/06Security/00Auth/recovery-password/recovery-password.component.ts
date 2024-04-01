import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RecoveryPasswordService } from '../../02Users/services/recoveryPassword.service';
import { finalize, first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  recoveryPasswordForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private recuperarPassword: RecoveryPasswordService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.recoveryPasswordForm = this.formBuilder.group({
      email_recuperacao: ['', Validators.required],
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/recuperar';
  }

  get f() {
    return this.recoveryPasswordForm.controls;
  }

  recoveryPassword(){

    this.submitted = true;
    this.loading = true;

    if (this.recoveryPasswordForm.invalid) {
      return;
    }

    this.recuperarPassword.recoveryPassword(this.f.email_recuperacao.value)
      .pipe(first(), finalize(()=>{ this.loading = false; }))
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          //location.reload();
          window.location.replace(this.returnUrl);
        },
        error => {
          //console.log('status',error);
          this.loading = false;
        });
  }
}
