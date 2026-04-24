import { Routes } from '@angular/router';
import { Dashboard } from './feature/dashboard/dashboard';
import { Login } from './feature/login/login';
import { Signup } from './feature/signup/signup';
import { authGaurdGuard } from './auth-gaurd-guard';

export const routes: Routes = [
    {path: "",redirectTo:"/login",pathMatch:"full"},
    {path:"login",component:Login},
    {path: "signup",component: Signup},
    {path: "dashboard",component: Dashboard ,canActivate:[authGaurdGuard]},
];
