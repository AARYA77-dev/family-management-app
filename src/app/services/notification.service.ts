import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'danger' | 'warning' | 'info';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal<string | null>(null);
  type = signal<NotificationType>('info');
  visible = signal(false);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: NotificationType = 'info', duration = 3000) {
    this.clear();
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    this.timeoutId = setTimeout(() => {
      this.visible.set(false);
      this.timeoutId = null;
    }, duration);
  }

  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.visible.set(false);
    this.message.set(null);
  }
}
