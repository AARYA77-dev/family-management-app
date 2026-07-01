import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserServices } from '../../services/user.services';
import { DepartmentMembers } from '../../model/departmentMember.model';

interface UserState {
  user: DepartmentMembers | null;
  showModal: boolean;
}

const initialState: UserState = {
  user: null,
  showModal: false
};

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((store) => {
    const userService = inject(UserServices);

    return {
      async loadUser() {
        try {
          const user = await userService.getCurrentUser();
          patchState(store, {
            user: user as DepartmentMembers
          });
        } catch (err) {
          console.error(err);
        }
      },
      openModal() {
        patchState(store, {
          showModal: true
        })
      },
      closeModal() {
        patchState(store, {
          showModal: false
        })
      }
    };
  })
);