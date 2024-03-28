import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxPaginationModule } from "ngx-pagination";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxLoadingModule } from "ngx-loading";
import { SharedMaterialModule } from "./sharedMaterial.module";
import { NotificationsModule } from "./components/notifications/notificacions.module";
import { LoadingComponent } from "./components/loading1/loading.component";

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot(),
    NgxLoadingModule,
    SharedMaterialModule,
    NotificationsModule,
  ],
  
  exports: [
    FormsModule,
    ReactiveFormsModule, 
    NgxPaginationModule,
    NgxLoadingModule, 
    SharedMaterialModule,
    NotificationsModule,
    LoadingComponent
  ], 
})
export class SharedModule {}
