import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { DepartmentMembers } from '../model/departmentMember.model';

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
    const { password, ...data } = snapshot.data() as DepartmentMembers;
    return data;
  }

  async addDepartmentMembers(data: DepartmentMembers) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then(async (res) => {
        await updateProfile(res.user, {
          displayName: data.name
        });
        const ref = doc(this.afs, `users/${res.user.uid}`);
        await setDoc(
          ref,
          {
            ...data
          },
          { merge: true }
        );
      })
  };
};
