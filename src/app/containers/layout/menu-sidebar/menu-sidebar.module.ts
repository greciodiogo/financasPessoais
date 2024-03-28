import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { ConnectionModule } from '@app/shared/components/connection/connection.module';
import { PasswordModule } from '@app/resources/Modules/06Security/02Users/components/password/password.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { MenuSidebarComponent } from './menu-sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule,PasswordModule,SharedGlobalModule],
  exports: [MenuSidebarComponent, PasswordModule ,ConnectionModule],
  declarations: [MenuSidebarComponent,NavMenuComponent],
})
export class MenuSidebarModule {}