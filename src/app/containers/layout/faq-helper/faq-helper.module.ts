import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { ConnectionModule } from '@app/shared/components/connection/connection.module';
import { PasswordModule } from '@app/resources/Modules/06Security/02Users/components/password/password.module';
import { FaqHelper } from './faq-helper.component';
FaqHelper
@NgModule({
  imports: [CommonModule, RouterModule,PasswordModule],
  exports: [FaqHelper, ConnectionModule],
  declarations: [FaqHelper],
})
export class FaqHelperModule {}

