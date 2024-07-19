import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterLink,
  ],
})
export class ProfileComponent implements OnInit {
  user: any;
  private userService = inject(UserService);

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    let userId = localStorage.getItem('user_id');
    console.log('User ID from localStorage:', userId);
    if (userId) {
      userId = userId.replace(/"/g, '');
      console.log('Formatted User ID:', userId);
      this.userService.getUserById(userId).subscribe(
        (response) => {
          console.log('Response from API:', response);
          if (response) {
            this.user = response;
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

  logout(): void {
    this.loginService.logout();
    window.location.reload();
  }
}
