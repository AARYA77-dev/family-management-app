import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, Router } from "@angular/router";
import { phoneValidator } from '../../../sharedUtils/phone.validator';
import { DepartMemberService } from '../../../services/departMember.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-new-department-member-form',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './new-department-member-form.html',
  styleUrl: './new-department-member-form.css',
})
export class NewDepartmentMemberForm {
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private departmentService = inject(DepartMemberService);
  saveBtnLoading = signal<boolean>(false);
  showPassword = false;
  categories = [
    "Faculty",
    "Staff",
    "Postdoc",
    "Ph.D",
    "M.Sc",
    "B.Tech",
    "Visitors",
    "Alumni",
  ];

  departementMeberForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)]],
    phonenumber: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
    address: ['', [Validators.required]],
    website: ['', [Validators.required, Validators.pattern('https?://.+')]],
    photoUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    category: ['', [Validators.required]]
  })


  onNumberInput(event: Event): void {
    phoneValidator(event, this.departementMeberForm, "phonenumber");
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  returnBack() {
    this.router.navigate(["/department"])
  }

  saveDepartmentMember() {
    this.saveBtnLoading.set(true);
    this.departmentService.addDepartmentMembers(this.departementMeberForm.getRawValue()).then(() => {
      this.notification.show('Member added successfully.', 'success');
      this.router.navigate(["/department"]);
    }).catch((err) => {
      this.notification.show(err.code === "auth/email-already-in-use" ? 'email is already registered' : 'Failed to add Member.', 'danger');
    }).finally(() => {
      this.saveBtnLoading.set(false);
    })
  }
}