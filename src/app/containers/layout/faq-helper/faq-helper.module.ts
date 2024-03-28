import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { ConnectionModule } from '@app/shared/components/connection/connection.module';
import { FaqHelper } from './faq-helper.component';
FaqHelper
@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [FaqHelper, ConnectionModule],
  declarations: [FaqHelper],
})
export class FaqHelperModule {}

