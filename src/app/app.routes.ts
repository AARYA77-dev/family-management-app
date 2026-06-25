import { Routes } from '@angular/router';
import { Login } from './feature/login/login';
import { authGaurdGuard } from './gaurd/auth-gaurd-guard';
import { loginGaurdGuard } from './gaurd/login-gaurd-guard';
import { NotFound } from './feature/not-found/not-found';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: Login, canActivate: [loginGaurdGuard] },
    { path: "signup", loadComponent: () => import("./feature/signup/signup").then(m => m.Signup), canActivate: [loginGaurdGuard] },
    {
        path: "dashboard", loadComponent: () => import("./feature/dashboard/dashboard").then(m => m.Dashboard), canActivate: [authGaurdGuard],
    },
    { path: "**", component: NotFound }
];
