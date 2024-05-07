import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { ChatMessageComponent } from './pages/chat-message/chat-message.component';

const routes: Routes = [
  {
    path: 'chat-message',
    component: ChatMessageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Chat Message",
      expectedPermission: "dashboard",
      layout:{
        customLayout: true,
        layoutNavigationTop: true,
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatMessageRoutingModule {}
