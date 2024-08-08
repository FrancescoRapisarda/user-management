import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private idCounter = 1;
  


  getUsers(): User[] {
    return this.users;
  }
  
  
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(user: User): void {
    user.id = this.idCounter++;
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }
  
  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
