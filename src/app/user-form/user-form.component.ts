import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../interface/user.interface';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {
  userForm: FormGroup;
  isEditing = false;

  @Input() userToEdit: User | null = null;
  @Output() userAdded = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['', Validators.required],
      active: [false]
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToEdit'] && this.userToEdit) {
      this.isEditing = true;
      this.userForm.patchValue(this.userToEdit);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditing) {
        this.userUpdated.emit(this.userForm.value);
        this.isEditing = false;
      } else {
        this.userAdded.emit(this.userForm.value);
      }
      this.userForm.reset();
    }
  }
}
