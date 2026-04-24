import { Component, inject, signal } from '@angular/core';
import { Familymembers } from '../../../services/familymembers';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
   private familyMembersService = inject(Familymembers);
currentUserEmail = signal<string>('');

ngOnInit() {
  this.familyMembersService.getCurrentUserEmail().then((email:any)=>{
     this.currentUserEmail.set(email)
   })
}

}
