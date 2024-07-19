import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonImg, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  user: any;
  userId: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if (this.userId) {
      this.userId = this.userId.trim();
      console.log('User ID from local storage:', this.userId);
      this.getUserData(this.userId);
    } else {
      console.error('ID do usuário não encontrado no local storage.');
    }
  }

  async getUserData(userId: string) {
    try {
      console.log('Fetching data from API...');
      const users: any[] = await firstValueFrom(this.http.get<any[]>('http://localhost:3000/users'));
      
      console.log('Data received from API:', users);
      this.user = users.find((u: any) => u.id === userId);
      if (!this.user) {
        console.error('Usuário não encontrado. User ID:', userId);
        console.log('Available user IDs:', users.map(u => u.id));
      } else {
        console.log('User found:', this.user);
      }
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
    }
  }
}
