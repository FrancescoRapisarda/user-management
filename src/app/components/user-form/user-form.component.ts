// src/app/user-form/user-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user.interface';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  userForm!: FormGroup;
  userId!: number;
  isEditMode = false;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [''],
      surname: [''],
      gender: ['uomo'],
      active: [false]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.isEditMode = true;
        const user = this.userService.getUserById(this.userId);
        if (user) {
          this.userForm.patchValue(user);
        }
      }
    });
  }

  onSubmit(): void {
    const user: User = this.userForm.value;
    if (this.isEditMode) {
      user.id = this.userId;
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.goBack();
  }
  
   goBack(): void {
    this.router.navigate(['/home']);
  }
}
