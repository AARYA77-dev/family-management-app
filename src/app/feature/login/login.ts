import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import gsap from 'gsap';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = signal<string>('');
  password = signal<string>('');
  loading = signal<boolean>(false);
  showPassword = false;
  @ViewChild('loginCard') loginCard!: ElementRef;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngAfterViewInit(): void {
    gsap.from(this.loginCard.nativeElement, {
      opacity: 0,
      width: 400,
      y: 40,
      duration: 0.5,
    });
  }

  goToSignup() {
    this.router.navigate(["/signup"])
  }

  login() {
    this.loading.set(true);
    this.auth.login(this.email(), this.password()).finally(() => {
      this.loading.set(false);
    });
  }
}
