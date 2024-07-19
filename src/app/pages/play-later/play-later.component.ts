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
import { UsersListPlayLaterService } from 'src/app/services/users-list-play-later.service';
import { GameArray } from 'src/app/models/game-play-later';
import { GameListService } from 'src/app/services/game-list.service';
import { Game } from 'src/app/models/game';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-play-later',
  templateUrl: './play-later.component.html',
  styleUrls: ['./play-later.component.scss'],
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
  providers: [UsersListPlayLaterService, GameListService],
})
export class PlayLaterComponent implements OnInit {
  games: GameArray[] = [];
  allGames: Game[] = [];
  userId: string | null = null;

  constructor(
    private usersListPlayLaterService: UsersListPlayLaterService,
    private gameListService: GameListService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if (this.userId) {
      this.usersListPlayLaterService
        .getPlayLaterByUserId(this.userId)
        .subscribe({
          next: (list) => {
            if (list) {
              this.games = list.games;
            }
          },
          error: (err) => {
            console.error('Failed to load play later games', err);
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
      this.usersListPlayLaterService
        .removeGameFromPlayLater(this.userId, gameId)
        .subscribe({
          next: () => {
            this.games = this.games.filter((game) => game.gameId !== gameId);
          },
          error: (err) => {
            console.error('Failed to remove game from play later list', err);
          },
        });
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Simulate an API call to refresh the data
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  scrollToTop() {
    document.querySelector('ion-content')?.scrollToTop(500);
  }
}
