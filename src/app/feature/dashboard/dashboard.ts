import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Familymembers } from '../../services/familymembers'; // Adjust import path as needed
import { Familymember } from '../../model/familymember'; // Adjust import path as needed
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../../core/layout/navbar/navbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Sidebar } from '../../core/layout/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, ToastModule, ButtonModule, DialogModule, Navbar, Sidebar, ProgressSpinnerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private familyMembersService = inject(Familymembers);
  loading = signal(false);
  deleteBtnloading = signal<string | null>(null);
  saveBtnLoading = signal<boolean>(false);
  selectedMemberId = signal<string>("");
  familyMembers = signal<Familymember[]>([]);

  familyMemberForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(1), Validators.max(120)]],
    relation: ['', Validators.required],
  });

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  loadFamilyMembers() {
    this.loading.set(true);
    this.familyMembersService.getFamilyMembers().then((data: any) => {
      this.familyMembers.set(data);
    })
      .finally(() => {
        this.loading.set(false);
      });
  }

  ngOnInit() {
    this.loadFamilyMembers();
  }



  saveFamilyMember() {
    this.saveBtnLoading.set(true);
    if (!this.familyMemberForm.valid) return;

    const formValue = this.familyMemberForm.getRawValue();

    if (this.selectedMemberId() === "") {
      this.familyMembersService.addFamilyMembers(formValue)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Family member added successfully',
            });
            this.loadFamilyMembers();
            this.familyMemberForm.reset();
            this.visible = false;
            this.saveBtnLoading.set(false);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add family member'
            });
            this.saveBtnLoading.set(false); 
          },
        });
    } else {
      this.familyMembersService.editFamilyMembers(formValue, this.selectedMemberId())
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Family member edited successfully',
            })
            this.loadFamilyMembers();
            this.familyMemberForm.reset();
            this.selectedMemberId.set("");
            this.saveBtnLoading.set(false); 
            this.visible = false;
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to edit family member'
            });
            this.saveBtnLoading.set(false); 
          }
        });
    }
  }

  editFamilyMember(member: any) {
    this.selectedMemberId.set(member.id);
    this.familyMemberForm.setValue({
      name: member.name ?? '',
      age: member.age ?? 0,
      relation: member.relation ?? '',
    });
    this.visible = true;
  }

  cancelEdit() {
    this.familyMemberForm.reset();
    this.selectedMemberId.set("");
    this.visible = false;
  }

  deleteFamilyMember(id: any) {
    this.deleteBtnloading.set(id);
    this.familyMembersService.deleteFamilyMembers(id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Family member deleted successfully',
          })
          this.loadFamilyMembers();
          this.deleteBtnloading.set(null);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete family member'
          })
          this.deleteBtnloading.set(null);
        }
      });
  }
}