import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentMembers } from '../../../model/departmentMember.model';
import { departmentMember } from '../../../store/departmentMemberStore/departmentMember.store';
import { DepartmentFooter } from '../../department-footer/department-footer';
import { DepartmentNavbar } from '../../department-navbar/department-navbar';

@Component({
  selector: 'app-department-member-detail',
  imports: [DepartmentNavbar, DepartmentFooter],
  templateUrl: './department-member-detail.html',
  styleUrl: './department-member-detail.css',
})
export class DepartmentMemberDetail implements OnInit {
  private route = inject(ActivatedRoute);
  departmentStore = inject(departmentMember);
  departmentid = signal<string>("");
  departmentMembers = signal<DepartmentMembers | null>(null);
  defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRo5RsazUIy3LPn-DG57NPTKgVyRcUqqJODFRmkEdbg&s=10';

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: async (params) => {
        this.departmentid.set(params.get('id')!);
        await this.departmentStore.LoadDepartmentMembeByid(this.departmentid())
        this.departmentMembers.set(this.departmentStore.getedMemberbyId())
      },
    })
  }
}
