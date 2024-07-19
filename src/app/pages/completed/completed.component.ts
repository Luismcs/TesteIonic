import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { UsersListCompletedService } from 'src/app/services/users-list-completed.service';
import { GameArray } from 'src/app/models/game-play-later';
import { GameListService } from 'src/app/services/game-list.service';
import { Game } from 'src/app/models/game';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    NavbarComponent
  ],
  providers: [UsersListCompletedService, GameListService],
})
export class CompletedComponent implements OnInit {
  games: GameArray[] = [];
  allGames: Game[] = [];
  userId: string | null = null;

  constructor(
    private usersListCompletedService: UsersListCompletedService,
    private gameListService: GameListService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if (this.userId) {
      this.usersListCompletedService
        .getCompletedByUserId(this.userId)
        .subscribe({
          next: (list) => {
            if (list) {
              this.games = list.games;
            }
          },
          error: (err) => {
            console.error('Failed to load completed games', err);
          },
        });

      this.gameListService.getGames().subscribe({
        next: (games) => {
          this.allGames = games;
        },
        error: (err) => {
          console.error('Failed to load all games', err);
        },
      });
    }
  }

  getGameThumbnail(gameId: number): string {
    const game = this.allGames.find((g) => g.id === gameId);
    return game ? game.thumbnail : '';
  }

  getGameTitle(gameId: number): string {
    const game = this.allGames.find((g) => g.id === gameId);
    return game ? game.title : 'Unknown Title';
  }

  getGamePlatform(gameId: number): string {
    const game = this.allGames.find((g) => g.id === gameId);
    return game ? game.platform : 'Unknown Platform';
  }

  getGameReleaseDate(gameId: number): string {
    const game = this.allGames.find((g) => g.id === gameId);
    return game ? game.release_date : 'Unknown Date';
  }

  removeGame(gameId: number) {
    if (this.userId) {
      this.usersListCompletedService
        .removeGameFromCompleted(this.userId, gameId)
        .subscribe({
          next: () => {
            this.games = this.games.filter((game) => game.gameId !== gameId);
          },
          error: (err) => {
            console.error('Failed to remove game from completed list', err);
          },
        });
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  scrollToTop() {
    document.querySelector('ion-content')?.scrollToTop(500);
  }
}
