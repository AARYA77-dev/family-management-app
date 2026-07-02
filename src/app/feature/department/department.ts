import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

import { DepartmentMembers } from '../../model/departmentMember.model';
import { departmentMember } from '../../store/departmentMemberStore/departmentMember.store';
import { DepartmentFooter } from '../department-footer/department-footer';
import { DepartmentNavbar } from '../department-navbar/department-navbar';

@Component({
  selector: 'app-department',
  imports: [ RouterOutlet, DepartmentNavbar,DepartmentFooter],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  private router = inject(Router);
  defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRo5RsazUIy3LPn-DG57NPTKgVyRcUqqJODFRmkEdbg&s=10';

  selectedCategory = 'All';
  departmentMembers = signal<DepartmentMembers[]>([]);
  departmentStore = inject(departmentMember);

  navigateToDetailsPage(id: string) {
    this.router.navigate([`department/${id}`])
  }


  get filteredMembers() {
    if (this.selectedCategory === 'All') {
      return this.departmentMembers();
    }

    return this.departmentMembers().filter(
      m => m.category === this.selectedCategory
    );
  }


  categories = [
    "All",
    "Faculty",
    "Staff",
    "Postdoc",
    "Ph.D",
    "M.Sc",
    "B.Tech",
    "Visitors",
    "Alumni",
  ];

  async ngOnInit() {
    await this.departmentStore.LoadDepartmentMembers();
    this.departmentMembers.set(this.departmentStore.members());
  }
}