import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth/auth.service';
import { Comfirmdialog } from './../../resuable-component/comfirmdialog/comfirmdialog';
import { UserStore } from './../../store/user/user.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [Comfirmdialog],
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private fireAuth = inject(AuthService);
  private router = inject(Router);
  userStore = inject(UserStore);
  confirmVisible = signal(false);
  loading = signal(false);
  logout() {
    this.confirmVisible.set(true);
  }

  navbarNavigation() {
    this.router.navigate(["department"]);
  }

  confirmLogout() {
    this.loading.set(true);

    this.fireAuth.logout()
      .finally(() => {
        this.loading.set(false);
        this.confirmVisible.set(false);
      });
  }

  ngOnInit() {
    this.userStore.loadUser();
  }

  cancelLogout() {
    this.confirmVisible.set(false);
  }
}
