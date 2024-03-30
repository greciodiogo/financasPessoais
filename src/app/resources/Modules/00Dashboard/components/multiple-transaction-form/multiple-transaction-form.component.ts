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
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DashboardService } from '@app/shared/services/dashboard.service';
import { first } from "rxjs/operators";

@Component({
  selector: "app-multiple-transaction-form",
  templateUrl: "./multiple-transaction-form.component.html",
  styleUrls: ["./multiple-transaction-form.component.css"],
})

export class MultipleTransactionFormComponent implements OnInit {
  
  public moneyControlForm: FormGroup;
  public loading: boolean = false;
  public submitted = false;
  public disabledButton = false

  public numberOfTransactions: any = [];
  
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
    public formBuilder: FormBuilder,
    public dashboardService: DashboardService,
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.getTransacaoTipos()
    this.numberOfTransactions.push(this.moneyControlForm.value)
  }

  createForm() {
    this.moneyControlForm = this.formBuilder.group({
      categoria_id: [null],
      data: this.formBuilder.array([]),
    });
  }

  get f() {
    return this.moneyControlForm.controls as unknown as FormGroup;
  }

  get trx() {
    return this.moneyControlForm.controls['data'] as FormArray
  }

  public handleAddTransacao(){
    const dataTransactions = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      transacaoDescricao: [null, Validators.required],
      transacao_tipos_id: [null],
      valor: [null, Validators.required],
      transacaoMotivo: [null],
      created_at: [null, Validators.required]
    })
    this.trx.push(dataTransactions)
  }

  public handleRemoveTransacao(index){
    this.trx.removeAt(index)
  }


  onSubmit() {
    this.submitted = true;
    if (this.moneyControlForm.invalid) {
      return;
    }
    
    this.loading = true;
    const id = this.moneyControlForm.getRawValue().id;
    this.createOrEdit(this.moneyControlForm, id === null ? true : false);
  }
  
  onReset() {
    this.submitted = false;
    this.moneyControlForm.reset();
    this.trx.clear()
    this.close.emit();
  }

  onClose(){
    this.onReset()
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true) {

    const categoryValidate = this.formType==3 ? 
      this.transaction.categoria_id : 
      this.formType

    this.moneyControlForm.patchValue({
      categoria_id: categoryValidate
      
      });
      
    this.dashboardService.createMultiplasTransacoes(formulario.value)
    .pipe(first())
    .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          this.loadList.emit(response);
          if (isCreate) {
            formulario.reset();
          }
          this.loadList.emit(Object(response).data);
          this.close.emit();
        },
        (error) => {1
        this.submitted = false;
        this.dashboardService.loading = false;
      }
    )
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

}
