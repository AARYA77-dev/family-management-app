import { Component, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-not-found',
  standalone: true,
  styles: [`
    :host {
      display: flex;
      height: 100vh;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      font-family: Arial, sans-serif;
    }

    .card {
      text-align: center;
      padding: 40px 50px;
      border-radius: 20px;

      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);

      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);

      color: #ffffff;
      max-width: 400px;
    }

    h1 {
      font-size: 3rem;
      margin: 0;
      color: #ff6b6b;
    }

    h2 {
      margin: 10px 0;
      font-size: 1.5rem;
    }

    p {
      opacity: 0.8;
      margin-bottom: 20px;
    }

    a {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 10px;
      text-decoration: none;
      color: white;
      background: rgba(255, 255, 255, 0.15);
      transition: 0.3s ease;
    }

    a:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  `],
  template: `
    <div class="card">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn’t exist.</p>

      <button (click)="goHome()">Go Home</button>
    </div>
  `
})
export class NotFound {
  private auth = inject(Auth);
  private router = inject(Router);
  goHome() {
    authState(this.auth).pipe(take(1)).subscribe((user) => {
      const routeName = user ? "/dashboard" : "/login";
      this.router.navigate([routeName]);
    })
  }
}
