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
        path: "dashboard", loadComponent: () => import("./feature/dashboard/dashboard").then(m => m.Dashboard), canActivate: [authGaurdGuard]

    },
    {
        path: "department", loadComponent: () => import("./feature/department/department").then(m => m.Department), canActivate: [authGaurdGuard]
    },
    {
        path: "department/AddNewDepartmentMember", loadComponent: () => import("./feature/department/new-department-member-form/new-department-member-form")
            .then(m => m.NewDepartmentMemberForm), canActivate: [authGaurdGuard]
    },
    {
        path: "department/:id",
        loadComponent: () => import("./feature/department/department-member-detail/department-member-detail")
            .then(m => m.DepartmentMemberDetail), canActivate: [authGaurdGuard]
    },
    {
        path: "access-mot-granded",
        loadComponent: () => import("./feature/access-not-granded-page/access-not-granded-page")
            .then(m => m.AccessNotGrandedPage),
    },
    { path: "**", component: NotFound }
];
