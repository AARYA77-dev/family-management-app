import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs
} from '@angular/fire/firestore';
import { Familymember } from '../model/familymember';
import { Auth } from '@angular/fire/auth';
import { of, firstValueFrom } from 'rxjs';
import { authState } from 'rxfire/auth';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Familymembers {
  private afs = inject(Firestore);
  private auth = inject(Auth);

 async getCurrentUserEmail(){
     const user = await firstValueFrom(authState(this.auth));
     return user?.email;
  }

 async getFamilyMembers() {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) return [];

    const ref = collection(this.afs, `users/${user.uid}/family`);
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  addFamilyMembers(data: Familymember) {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) return of(null);

        const ref = collection(this.afs, `users/${user.uid}/family`);
        return addDoc(ref, { ...data });
      })
    );
  }

  editFamilyMembers(data: Familymember, id: string) {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) return of(null);

        const ref = doc(this.afs, `users/${user.uid}/family/${id}`);
        const { id: _, ...payload } = data;
        return updateDoc(ref, payload);
      })
    );
  }

  deleteFamilyMembers(id: string) {
    return authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        if (!user) return of(null);

        const ref = doc(this.afs, `users/${user.uid}/family/${id}`);
        return deleteDoc(ref);
      })
    );
  }
}