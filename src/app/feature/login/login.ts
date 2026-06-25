import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import gsap from 'gsap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  email = signal<string>('');
  password = signal<string>('');
  loading = signal<boolean>(false);
  private auth = inject(AuthService);

  @ViewChild('loginCard') loginCard!: ElementRef;

  ngAfterViewInit(): void {
    gsap.from(this.loginCard.nativeElement, {
      opacity: 0,
      width: 400,
      y: 40,
      duration: 0.5,
    });
  }

  login() {
    this.loading.set(true);
    this.auth.login(this.email(), this.password()).finally(() => {
      this.loading.set(false);
    });
  }
}
