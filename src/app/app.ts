import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { NotificationComponent } from './resuable-component/notificationservice/notificationservice';
import { NotificationService } from './services/notifications/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NotificationComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('family-managment-app');
  showLayout = true;
  notification = inject(NotificationService);

  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !['/login', '/signup'].includes(event.url);
      }
    });
  }
}
