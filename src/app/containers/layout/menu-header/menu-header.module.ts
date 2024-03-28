import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuHeaderComponent } from './menu-header.component';
 import { ConnectionModule } from '@app/shared/components/connection/connection.module';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';

@NgModule({
  imports: [CommonModule, RouterModule, SharedGlobalModule],
  exports: [MenuHeaderComponent, ConnectionModule],
  declarations: [MenuHeaderComponent,MainHeaderComponent,NavMenuComponent],
})
export class MenuHeaderModule {}