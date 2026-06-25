import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '@angular/fire/auth';
import { UserServices } from '../../services/user-services';

interface UserState {
  user: User | null;
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
          const user = await userService.getCurrentUserEmail();
          patchState(store, {
            user: user,
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