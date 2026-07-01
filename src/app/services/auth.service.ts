import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private notification = inject(NotificationService);
  private fireAuth = inject(Auth);
  private afs = inject(Firestore);

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password)
      .then(async () => {
        this.notification.show('Login successful', 'success');
        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.notification.show(
          err.code === 'auth/invalid-credential' ? 'Credential are wrong' : 'Login failed: ' + err.code,
          'danger'
        );
        this.router.navigate(['/login']);
        console.error('ERROR', err);
      });
  }

  async signup(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.fireAuth, email, password)
      .then(async (res) => {
        await updateProfile(res.user, {
          displayName: name
        });
        const ref = doc(this.afs, `users/${res.user.uid}`);
        
        await setDoc(
          ref,
          {
            name,
            email: res.user.email,
          },
          { merge: true }
        );

        await this.fireAuth.signOut();
        this.notification.show('Signup successful', 'success');
        localStorage.setItem('token', 'true');
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.notification.show(
          err.code === 'auth/email-already-in-use' ? 'Email is already in use' : 'Signup failed: ' + err.code,
          'danger'
        );
        this.router.navigate(['/signup']);
        console.error('ERROR', err);
      });
  }

  async logout() {
    return this.fireAuth
      .signOut()
      .then(() => {
        this.notification.show('Logout successful', 'success');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.notification.show('Logout failed', 'danger');
        console.error('ERROR', err);
      });
  }
}
