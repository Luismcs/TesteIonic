import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonItem, IonIcon,IonLabel,IonHeader,IonToolbar,IonTitle,IonAvatar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonList,IonItem,IonIcon,IonLabel,IonHeader,IonToolbar,IonTitle,IonAvatar , HttpClientModule, RouterLink,CommonModule],
})
export class NavbarComponent  implements OnInit {

  user: any;
  avatar?: string;
  @Input() title: string = '';
  showLojaButton?: boolean;

  private userService = inject(UserService)


  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (this.router.url === '/loja') {
        this.showLojaButton = false;
      } else {
        this.showLojaButton = true;
      }
    });

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
            this.avatar = response.avatar;
            console.log(this.user);
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

  onClickProfile(){
    this.router.navigate(['profile'])
  }

}

  


