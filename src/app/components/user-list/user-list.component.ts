import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user.interface';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  private userService = inject(UserService);
  users = this.userService.getUsers();
  addedUsers: User[] = [];
  showAddedUsersList = false;

  showAddedUsers(): void {
    this.addedUsers = this.userService.getUsers();
    this.showAddedUsersList = !this.showAddedUsersList;
  }
}
