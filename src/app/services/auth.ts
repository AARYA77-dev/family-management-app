import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private fireAuth: Auth, private router: Router,) { }
  private messageService = inject(MessageService);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Login successful',
      });
      localStorage.setItem("token", "true")
      this.router.navigate(['/dashboard'])
    }).catch((err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Login failed',
        detail: err.message
      });
      this.router.navigate(['/login'])
      console.log("ERROR", err)
    })
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.fireAuth, email, password).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Signup successful',
      });
      localStorage.setItem("token", "true")
      this.router.navigate(['/login'])
    }).catch((err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Signup failed'
      });
      this.router.navigate(['/signup'])
      console.log("ERROR", err)
    })
  }

  logout() {
    return this.fireAuth.signOut().then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Logout successful',
      });
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Logout failed'
        });
        console.log("ERROR", err)
      })
  }
}
