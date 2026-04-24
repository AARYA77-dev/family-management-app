import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ToastModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  email = signal<string>('');
  password = signal<string>('');
  confirmPassword = signal<string>('');
  agreeToTerms = signal<boolean>(false);
  loading = signal<boolean>(false);
  passwordsMatch = signal<boolean>(true);

  constructor(private auth: AuthService) {}

  onPasswordChange() {
    this.passwordsMatch.set(
      this.password() === this.confirmPassword() ||
      this.confirmPassword() === ''
    );
  }

  signup() {
    this.loading.set(true);
    this.auth.signup(this.email(), this.password()).finally(()=>{
      this.loading.set(false);
    });
  }
}
