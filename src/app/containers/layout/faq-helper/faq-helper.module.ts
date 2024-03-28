import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaqHelper } from './faq-helper.component';
FaqHelper
@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [FaqHelper],
  declarations: [FaqHelper],
})
export class FaqHelperModule {}

