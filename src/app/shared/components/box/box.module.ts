import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box/box.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';

@NgModule({
  declarations: [BoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot(),
    LoadingModule,
    SharedGlobalModule
  ],
  exports: [BoxComponent],
})
export class BoxModule {}
