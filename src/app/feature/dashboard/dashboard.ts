import { Component, computed, effect, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { Familymembers } from '../../services/familymembers';
import { Familymember } from '../../model/familymember';
import { forkJoin } from 'rxjs';
import { familymembers } from '../../store/family/family.store';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { UserServices } from '../../services/user-services';
import { UserStore } from '../../store/user/user.store';
import { NotificationService } from '../../services/notification.service';
import { Navbar } from '../navbar/navbar';
import { Comfirmdialog } from '../../resuable-component/comfirmdialog/comfirmdialog';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterOutlet, ReactiveFormsModule, Navbar, Comfirmdialog,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private familyMembersService = inject(Familymembers);
  private userService = inject(UserServices);
  familyStore = inject(familymembers);
  userStore = inject(UserStore);
  loading = signal(false);
  saveBtnLoading = signal(false);
  showMemberModal = signal(false);
  selectedMemberId = signal('');
  confirmVisible = signal(false);
  confirmType = signal<'delete' | 'logout' | 'bulk'>('delete');
  confirmMessage = signal('');
  confirmTitle = signal('');
  searchQuery = signal('');
  selectedMembers = signal<Familymember[]>([]);
  bulkMode = signal(false);
  deleteTargetId: string | null = null;
  screenWidth = signal(window.innerWidth);
  isDesktop = computed(() => this.screenWidth() >= 768);

  filteredMembers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const members = this.familyStore.members();
    if (!query) {
      return members;
    }
    return members.filter((member) =>
      member.firstname?.toLowerCase().includes(query) ||
      member.lastname?.toLowerCase().includes(query) ||
      member.age?.toString().includes(query) ||
      member.relation?.toLowerCase().includes(query)
    );
  });

  allSelected = computed(
    () =>
      this.filteredMembers().length > 0 &&
      this.filteredMembers().every((member) =>
        this.selectedMembers().some((selected) => selected.id === member.id)
      )
  );

  localtime(time: string | undefined) {
    if (!time) return;
    const givenTime = new Date(time);
    return givenTime.toLocaleString('en-US', {
      hour12: true,
    });
  }

  originalUserValues: { name: string, phonenumber: string } = {
    name: '',
    phonenumber: '',
  };

  familyRelation = [
    'Father',
    'Mother',
    'Husband',
    'Wife',
    'Son',
    'Daughter',
    'Brother',
    'Sister',
    'Grandfather',
    'Grandmother',
    'Uncle',
    'Aunt',
    'Nephew',
    'Niece',
    'Cousin',
    'Guardian',
    'Other',
  ];

  familyMemberForm = this.fb.nonNullable.group({
    firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    age: [0, [Validators.required, Validators.min(1), Validators.max(120)]],
    relation: ['', Validators.required],
  });

  UserDetailsForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    phonenumber: ['', [Validators.required, this.phoneValidator]],
  });

  phoneValidator(control: AbstractControl) {
    const value = control.value;

    if(!value) return null

    if (!/^[0-9]*$/.test(value)) {
      return { onlyNumbers: true };
    }

    if (!/^[0-9]{10}$/.test(value)) {
      return { invalidLength: true };
    }

    return null;
  }

  @ViewChild('table') table!: ElementRef;

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  showDialog() {
    this.showMemberModal.set(true);
  }

  constructor() {
    effect(() => {
      this.fillValueUserDetails();
    });
  }

  async fillValueUserDetails() {
    const user = this.userStore.user();

    if (user) {
      this.UserDetailsForm.patchValue({
        name: user.displayName ?? '',
      });
    }

    await this.userService.getUserNumber().then((number) => {
      this.UserDetailsForm.patchValue({
        phonenumber: number ?? '',
      });
    });

    this.originalUserValues = this.UserDetailsForm.getRawValue();
  }

  closeModal() {
    this.fillValueUserDetails();
    this.userStore.closeModal();
  }

  hasUserChanges(): boolean {
    const current = this.UserDetailsForm.getRawValue();
    return (
      current.name !== this.originalUserValues.name ||
      current.phonenumber !== this.originalUserValues.phonenumber
    );
  }

  async loadFamilyMembers() {
    await this.userStore.loadUser();
    this.loading.set(true);
    await this.familyStore.LoadMembers().finally(() => {
      setTimeout(() => {
        if (this.table) {
          gsap.from(this.table.nativeElement, {
            opacity: 0,
            y: 20,
            duration: 1,
          });
        }
      });
      this.loading.set(false);
    });
  }

  ngOnInit() {
    this.loadFamilyMembers();
  }

  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedMembers.set([]);
    } else {
      this.selectedMembers.set([...this.filteredMembers()]);
    }
  }

  toggleSelection(member: Familymember) {
    const selected = [...this.selectedMembers()];
    const index = selected.findIndex((item) => item.id === member.id);
    if (index === -1) {
      selected.push(member);
    } else {
      selected.splice(index, 1);
    }
    this.selectedMembers.set(selected);
  }

  isSelected(member: Familymember) {
    return this.selectedMembers().some((selected) => selected.id === member.id);
  }

  saveFamilyMember() {
    this.saveBtnLoading.set(true);
    if (!this.familyMemberForm.valid) {
      this.saveBtnLoading.set(false);
      return;
    }

    const formValue = this.familyMemberForm.getRawValue();
    if (this.selectedMemberId() === '') {
      this.familyMembersService.addFamilyMembers(formValue).subscribe({
        next: () => {
          this.notification.show('Family member added successfully.', 'success');
          this.loadFamilyMembers();
          this.familyMemberForm.reset();
          this.showMemberModal.set(false);
          this.saveBtnLoading.set(false);
        },
        error: () => {
          this.notification.show('Failed to add family member.', 'danger');
          this.saveBtnLoading.set(false);
        },
      });
    } else {
      this.familyMembersService.editFamilyMembers(formValue, this.selectedMemberId()).subscribe({
        next: () => {
          this.notification.show('Family member updated successfully.', 'success');
          this.loadFamilyMembers();
          this.familyMemberForm.reset();
          this.selectedMemberId.set('');
          this.showMemberModal.set(false);
          this.saveBtnLoading.set(false);
        },
        error: () => {
          this.notification.show('Failed to edit family member.', 'danger');
          this.saveBtnLoading.set(false);
        },
      });
    }
  }

  editFamilyMember(member: Familymember) {
    this.selectedMemberId.set(member.id ?? '');
    this.familyMemberForm.setValue({
      firstname: member.firstname ?? '',
      lastname: member.lastname ?? '',
      age: member.age ?? 0,
      relation: member.relation ?? '',
    });
    this.showMemberModal.set(true);
  }

  cancelEdit() {
    this.familyMemberForm.reset();
    this.selectedMemberId.set('');
    this.showMemberModal.set(false);
  }

  async addUserDetails() {
    this.saveBtnLoading.set(true);
    this.userService
      .saveUserDetails(this.UserDetailsForm.value.name!, this.UserDetailsForm.value.phonenumber!)
      .then(() => {
        this.notification.show(
          this.userStore.user()?.displayName ? 'User details updated successfully.' : 'User details added successfully.',
          'success'
        );
        this.userStore.closeModal();
      })
      .catch((err) => {
        console.error(err);
        this.notification.show('Failed to save user details.', 'danger');
      })
      .finally(() => {
        this.saveBtnLoading.set(false);
      });
  }


  openDelete(memberId: string) {
    this.deleteTargetId = memberId;
    this.bulkMode.set(false);
    this.confirmTitle.set('Delete Member');
    this.confirmMessage.set('Are you sure you want to delete this member?');
    this.confirmType.set('delete');
    this.confirmVisible.set(true);
  }

  openBulkDelete() {
    this.bulkMode.set(true);

    this.confirmTitle.set('Delete Selected Members');
    this.confirmMessage.set('Are you sure you want to delete selected members?');
    this.confirmType.set('delete');

    this.confirmVisible.set(true);
  }

  openLogout() {
    this.confirmTitle.set('Logout');
    this.confirmMessage.set('Are you sure you want to logout?');
    this.confirmType.set('logout');

    this.confirmVisible.set(true);
  }

  cancelAction() {
    this.closeConfirm();
  }

  closeConfirm() {
    this.confirmVisible.set(false);
    this.deleteTargetId = null;
    this.bulkMode.set(false);
  }
  confirmAction() {
    if (!this.bulkMode() && this.deleteTargetId) {
      this.familyMembersService.deleteFamilyMembers(this.deleteTargetId).subscribe({
        next: () => {
          this.notification.show('Family member deleted successfully.', 'success');
          this.loadFamilyMembers();
        },
        error: () => {
          this.notification.show('Failed to delete family member.', 'danger');
        },
      });
    }

    if (this.bulkMode()) {
      const selected = this.selectedMembers();
      if (!selected.length) {
        return;
      }

      const deleteRequest = selected.map((member: Familymember) => this.familyMembersService.deleteFamilyMembers(member.id!));
      forkJoin(deleteRequest).subscribe({
        next: () => {
          this.selectedMembers.set([]);
          this.notification.show('Members deleted successfully.', 'success');
          this.loadFamilyMembers();
        },
        error: () => {
          this.notification.show('Failed to delete selected family members.', 'danger');
        },
      });
    }
    this.closeConfirm();
  }
}
