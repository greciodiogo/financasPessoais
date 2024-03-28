// online-status.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus(): void {
    this.statusChanged.emit(navigator.onLine);
  }
}
