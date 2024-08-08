import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interface/user.interface';


@Component({
  selector: 'app-added-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './added-users.component.html',
  styleUrl: './added-users.component.css'
})
export class AddedUsersComponent {
  
  private userService = inject(UserService);
  users = this.userService.getUsers();
  addedUsers: User[] = [];
  showAddedUsersList = false;
   private router = inject(Router);

  showAddedUsers(): void {
    this.addedUsers = this.userService.getUsers();
    this.showAddedUsersList = !this.showAddedUsersList;
  }
  
  goBack(): void {
    this.router.navigate(['/home']);
  }
  
  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }

}
