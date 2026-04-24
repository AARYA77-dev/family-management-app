import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, ButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private fireAuth = inject(AuthService);
  loading = signal<boolean>(false)

  logout() {
    this.loading.set(true);
    this.fireAuth.logout().finally(()=>{
      this.loading.set(false);
    });
  }
}
