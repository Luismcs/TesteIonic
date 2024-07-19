import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, CommonModule, ReactiveFormsModule],
})
export class EditProfilePage implements OnInit {

  userForm: FormGroup;
  userId: string | null = null;
  user: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      avatar: ['']
    });
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    console.log('User ID from localStorage:', this.userId);
    if (this.userId) {
      this.userId = this.userId.replace(/"/g, '');
      console.log('Formatted User ID:', this.userId);
      this.userService.getUserById(this.userId).subscribe(
        (response) => {
          console.log('Response from API:', response);
          if (response) {
            this.user = response;
            this.userForm.setValue({
              name: this.user.name,
              email: this.user.email,
              password: '',
              avatar: this.user.avatar
            });
          } else {
            console.error('User not found');
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      console.error('No user_id in localStorage');
    }
  }

  saveProfile() {
    if (this.userId) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      if (!updatedUser.password) {
        delete updatedUser.password;
      }
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/loja']);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}
