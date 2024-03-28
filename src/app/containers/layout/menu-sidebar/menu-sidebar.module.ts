import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { MenuSidebarComponent } from './menu-sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedGlobalModule],
  exports: [MenuSidebarComponent],
  declarations: [MenuSidebarComponent,NavMenuComponent],
})
export class MenuSidebarModule {}