import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-notificationservice',
  imports: [CommonModule],
  templateUrl: './notificationservice.html',
  styleUrl: './notificationservice.css',
})
export class NotificationComponent {
 notification = inject(NotificationService);
}
