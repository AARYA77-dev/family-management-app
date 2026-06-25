import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import gsap from 'gsap';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements AfterViewInit {
  email = signal<string>('');
  name = signal<string>('');
  password = signal<string>('');
  confirmPassword = signal<string>('');
  agreeToTerms = signal<boolean>(false);
  loading = signal<boolean>(false);
  passwordsMatch = signal<boolean>(true);

  @ViewChild('signupCard') signupCard!: ElementRef;
  private auth = inject(AuthService);

  ngAfterViewInit(): void {
    gsap.from(this.signupCard.nativeElement, {
      opacity: 0,
      width: 400,
      y: 40,
      duration: 0.5,
    });
  }

  onPasswordChange() {
    this.passwordsMatch.set(this.password() === this.confirmPassword() || this.confirmPassword() === '');
  }

  signup() {
    this.loading.set(true);
    this.auth.signup(this.name(), this.email(), this.password()).finally(() => {
      this.loading.set(false);
    });
  }
}
