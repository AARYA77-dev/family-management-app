import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from './../../services/auth';
import { UserStore } from './../../store/user/user.store';
import { Comfirmdialog } from './../../resuable-component/comfirmdialog/comfirmdialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports:[Comfirmdialog],
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private fireAuth = inject(AuthService);
  userStore = inject(UserStore);
  confirmVisible = signal(false);
  loading = signal(false);
  @ViewChild('box') box!: ElementRef;

  logout() {
    this.confirmVisible.set(true);
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
