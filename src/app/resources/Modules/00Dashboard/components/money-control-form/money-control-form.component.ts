import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
import { LanguageService } from "@app/shared/services/language.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { DashboardService } from '@app/shared/services/dashboard.service';
import { first } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { addtransaction } from "@app/resources/Store/Repositorio/Repositorio.Action";

@Component({
  selector: "app-money-control-form",
  templateUrl: "./money-control-form.component.html",
  styleUrls: ["./money-control-form.component.css"],
})

export class MoneyControlFormComponent implements OnInit {
  
  public moneyControlForm: UntypedFormGroup;
  public loading: boolean = false;
  public submitted = false;
  public disabledButton = false
  
  public valor: number;
  @Input() transaction: any ;
  @Input() formType: number =1
  @Input() activePosition: boolean = false
  @Output() public close = new EventEmitter<any>();
  @Output() loadList: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('closeModal') closeModal: ElementRef;

  public selectForm: {
    categorias: []
  }
  
  constructor(
    public configService: FnService,
    public formBuilder: UntypedFormBuilder,
    public dashboardService: DashboardService,
    private store: Store
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.getTransacaoTipos()
  }

  createForm() {
    this.moneyControlForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      categoria_id: [null],
      transacaoDescricao: [null, Validators.required],
      transacao_tipos_id: [null],
      valor: [null, Validators.required],
      transacaoMotivo: [null],
    });
  }

  get f() {
    return this.moneyControlForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    if (this.moneyControlForm.invalid) {
      return;
    }
    
    this.loading = true;
    const id = this.moneyControlForm.getRawValue().id;
    this.createOrEdit(this.moneyControlForm, id === null ? true : false, id);
  }
  
  onReset() {
    this.submitted = false;
    this.moneyControlForm.reset();
    this.close.emit();
  }

  onClose(){
    this.onReset()
  }

  createOrEdit(formulario: UntypedFormGroup, isCreate: boolean = true, id) {

    const categoryValidate = this.formType==3 ? 
      this.transaction.categoria_id : 
      this.formType

    this.moneyControlForm.patchValue({
      categoria_id: categoryValidate
      });

      // this.loading = true
      this.store.dispatch(addtransaction({ transaction: formulario.value }))
      this.loading = false;
      this.submitted = false;
      if (isCreate) {
          formulario.reset();
        }
        this.loadList.emit(Object(addtransaction({ transaction: formulario.value })).data);
  }

  public imageTitle: string ="income.png"
  getImageTitles() {
    this.formType == 1 ?
    this.imageTitle = "income.png" :
    this.imageTitle = "withdraw.png" 
  }

  public categories= []

  public getTransacaoTipos(){
    this.dashboardService.loading = true;
    this.dashboardService.getTransacaoTipos().subscribe(
      (response)=> {
        this.categories = response.data
        this.dashboardService.loading = false;
      },
      (error) => {
        this.dashboardService.loading = false;
      }
    )
  }

  public setTransaction(transaction){
    this.transaction = transaction
    if (transaction != null) {
      this.moneyControlForm.patchValue({
        ...this.transaction,
        id: this.transaction.id,
        categoria_id: this.transaction.categoria_id,
        conta_id: this.transaction.conta_id,
      });
    }
  }
  
  public ngOnChanges(changes: SimpleChanges) {
    this.getImageTitles()
  }

  public valorNumber= 0 
  updateValor(value) {
    this.valorNumber = value;
  }  
}
