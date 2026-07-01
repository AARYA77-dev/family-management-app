import { inject, Injectable } from '@angular/core';
import { Auth, authState, updateProfile } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc, } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private auth = inject(Auth);
  private afs = inject(Firestore);
  async getCurrentUser() {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) return;
    const ref = doc(this.afs, `users/${user.uid}/`);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    return { ...data, metadata: user.metadata };
  }


  async saveUserDetails(name: string, phonenumber: string) {
    const user = await firstValueFrom(authState(this.auth));

    if (!user) {
      throw new Error('User not logged in');
    }

    await updateProfile(user, {
      displayName: name
    });

    const ref = doc(this.afs, `users/${user.uid}`);


    await setDoc(
      ref,
      {
        name,
        email: user.email,
        phonenumber
      },
      { merge: true }
    );
  }
}
