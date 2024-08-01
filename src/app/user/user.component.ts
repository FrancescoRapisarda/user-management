import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../interface/user.interface';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: User[] = [];
  userToEdit: User | null = null;

  addUser(user: User) {
    this.users.push(user);
  }

  editUser(user: User) {
    this.userToEdit = user;
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.name === this.userToEdit!.name && user.surname === this.userToEdit!.surname);
    if (index > -1) {
      this.users[index] = updatedUser;
    }
    this.userToEdit = null;
  }
}
