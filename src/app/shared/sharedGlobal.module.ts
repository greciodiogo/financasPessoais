import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxPaginationModule } from "ngx-pagination";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingModule } from "./components/loading/loading.module";
import { NgxLoadingModule } from "ngx-loading";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BackdropBlurModule } from "./components/backdrop-blur/backdrop-blur.module";
import { DeleteDataModule } from "./components/delete-data/delete-data.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { GenericTableModule } from "./components/generic-table/generic-table.module";
import { ButtonFileUploadModule } from "@app/shared/components/button-file-upload/button-file-upload.module";
import { NotificationsModule } from "./components/notifications/notificacions.module";
import { TableModule } from "./components/table/table.module";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import {
  MgxCircularProgressBarModule,
  MgxCircularProgressFullBarModule,
  MgxCircularProgressPieModule,
} from "mgx-circular-progress-bar";
import { SelectMelhoradoModule } from "./components/select-melhorado/select-melhorado.module";

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { CreditCardModule } from "./components/credit-card/credit-card.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot(),
    LoadingModule,
    NgxLoadingModule,
    NgMultiSelectDropDownModule.forRoot(),
    BackdropBlurModule,
    DeleteDataModule,
    GenericTableModule,
    ButtonFileUploadModule,
    ModalModule.forRoot(),
    NotificationsModule,
    TableModule,
    CreditCardModule,
    SelectMelhoradoModule,
    NgbTooltipModule,
    MgxCircularProgressBarModule,
    MgxCircularProgressFullBarModule,
    MgxCircularProgressPieModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    LoadingModule,
    NgxLoadingModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule,
    BackdropBlurModule,
    DeleteDataModule,
    ButtonFileUploadModule,
    TableModule,
    CreditCardModule,
    SelectMelhoradoModule,
    NgbTooltipModule,
    MgxCircularProgressBarModule,
    MgxCircularProgressFullBarModule,
    MgxCircularProgressPieModule,
    TranslateModule,
  ],
  providers: [TranslateService]
})
export class SharedGlobalModule {}
