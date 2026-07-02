
import { inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withMethods,
    withState
} from '@ngrx/signals';

import { DepartmentMembers } from '../../model/departmentMember.model';
import { DepartMemberService } from '../../services/department/departMember.service';

interface departmentMemberState {
    members: DepartmentMembers[],
    getedMemberbyId: DepartmentMembers | null
}

const initailState: departmentMemberState = {
    members: [],
    getedMemberbyId: null
}

export const departmentMember = signalStore(
    { providedIn: "root" },
    withState(initailState),
    withMethods((store) => {
        const departMemberService = inject(DepartMemberService);
        return {
            async LoadDepartmentMembers() {
                try {
                    const member = await departMemberService.getDepartmentMembers();
                    patchState(store, {
                        members: member as DepartmentMembers[],
                    })
                }
                catch (err) {
                    console.log(err);
                }
            },
            async LoadDepartmentMembeByid(id: string) {
                try {
                    const getedMemberbyId = await departMemberService.getDepartmentMembersById(id);
                    patchState(store, {
                        getedMemberbyId: getedMemberbyId as DepartmentMembers
                    })
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    })
)