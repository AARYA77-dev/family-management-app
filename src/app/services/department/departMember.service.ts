import { inject, Injectable } from '@angular/core';
import { getApps } from '@angular/fire/app';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, updateProfile } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import {
  doc as sdkDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import { firstValueFrom } from 'rxjs';

import { DepartmentMembers } from '../../model/departmentMember.model';

@Injectable({
  providedIn: 'root',
})
export class DepartMemberService {
  private afs = inject(Firestore);
  private auth = inject(Auth);

  async getDepartmentMembers() {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) return [];

    const ref = collection(this.afs, `users`);
    const snapshot = await getDocs(ref);

    const data = snapshot.docs.map(doc => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...cleanedData } = doc.data();
      return {
        id: doc.id,
        ...cleanedData
      }
    });
    return data;
  }

  async getDepartmentMembersById(id: string) {
    const ref = doc(this.afs, `users/${id}`);
    const snapshot = await getDoc(ref);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = snapshot.data() as DepartmentMembers;
    return data;
  }

  async addDepartmentMembers(data: DepartmentMembers) {
    const secondaryApp = getApps().find(app => app.name === 'Secondary') ?? initializeApp(this.auth.app.options, 'Secondary');
    const secondaryAuth = getAuth(secondaryApp);
    const secondaryFirestore = getFirestore(secondaryApp);
    return createUserWithEmailAndPassword(secondaryAuth, data.email, data.password)
      .then(async (res) => {
        await updateProfile(res.user, {
          displayName: data.name
        });
        const ref = sdkDoc(secondaryFirestore, `users/${res.user.uid}`);
        await setDoc(
          ref,
          {
            ...data
          },
          { merge: true }
        );
        await secondaryAuth.signOut();
      }).catch((err) => {
        console.log(err)
      })
  };
};
