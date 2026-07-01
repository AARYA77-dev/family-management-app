import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-navbar',
  imports: [],
  templateUrl: './department-navbar.html',
  styleUrl: './department-navbar.css',
})
export class DepartmentNavbar {
  private router = inject(Router);

  navbarNavigation(url: string) {
    this.router.navigate([url]);
  }
}
