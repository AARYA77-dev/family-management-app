import { Familymember } from "../../model/familymember.model"
import { inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withMethods,
    withState
} from '@ngrx/signals';
import { Familymembers } from "../../services/familymembers.service";

interface Familystate  {
    members: Familymember[]
}

const initailState: Familystate = {
    members: []
}

export const familymembers = signalStore(
    { providedIn: "root" },
    withState(initailState),
    withMethods((store) => {
        const familyService = inject(Familymembers)

        return {
            async LoadMembers() {
                try {
                    const member = await familyService.getFamilyMembers()
                    patchState(store, {
                        members: member as Familymember[],
                    })
                }
                catch (err) {
                    console.log(err);
                }

            }
        }
    })
)