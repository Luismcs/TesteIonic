import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonList, IonListHeader, IonLabel, IonText, IonItem, IonImg, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { GameListService } from 'src/app/services/game-list.service';
import { GameDetails } from 'src/app/models/game-details';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { GamePlayLater } from 'src/app/models/game-play-later';
import { UsersListPlayLaterService } from 'src/app/services/users-list-play-later.service';
import { UsersListCurrentyPlayingService } from 'src/app/services/users-list-currenty-playing.service';
import { UsersListPlayedService } from 'src/app/services/users-list-played.service';
import { UsersListCompletedService } from 'src/app/services/users-list-completed.service';

@Component({
  selector: 'app-detalhes-jogo',
  templateUrl: './detalhes-jogo.page.html',
  styleUrls: ['./detalhes-jogo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonList, IonListHeader, IonLabel, IonText, IonItem, IonImg, IonGrid, IonRow, IonCol,HttpClientModule],
  providers: [GameListService,UsersListPlayLaterService, UsersListCurrentyPlayingService, UsersListPlayedService, UsersListCompletedService],
})
export class DetalhesJogoPage implements OnInit {

  game: GameDetails | null = null;
  verPlayLater: boolean = false;
  userId: string | null = null;
  verCurrentlyPlaying: boolean = false;
  verPlayed: boolean = false;
  verCompleted: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private gamesListService: GameListService,
    private usersListPlayLaterService: UsersListPlayLaterService,
    private usersListCurrentlyPlayingService: UsersListCurrentyPlayingService,
    private usersListPlayedService: UsersListPlayedService,
    private usersListCompletedService: UsersListCompletedService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    const gameId = this.route.snapshot.paramMap.get('id');

    if (gameId) {
      this.gamesListService.getGameDetails(gameId).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.game = response[0];
            this.checkGameLists();
          }
        }
      });
    }
  }

  checkGameLists() {
    if (this.userId && this.game) {
      this.usersListPlayLaterService.getPlayLaterByUserId(this.userId).subscribe({
        next: (list) => {
          this.verPlayLater = list?.games.some(game => game.gameId === this.game!.id) ?? false;
          this.checkIfGameInCurrentlyPlayingList();
        }
      });
    }
  }

  checkIfGameInCurrentlyPlayingList() {
    if (this.userId && this.game) {
      this.usersListCurrentlyPlayingService.getCurrentlyPlayingByUserId(this.userId).subscribe({
        next: (list) => {
          this.verCurrentlyPlaying = list?.games.some(game => game.gameId === this.game!.id) ?? false;
          this.checkIfGameInPlayedList();
        }
      });
    }
  }

  checkIfGameInPlayedList() {
    if (this.userId && this.game) {
      this.usersListPlayedService.getPlayedByUserId(this.userId).subscribe({
        next: (list) => {
          this.verPlayed = list?.games.some(game => game.gameId === this.game!.id) ?? false;
          this.checkIfGameInCompletedList();
        }
      });
    }
  }

  checkIfGameInCompletedList() {
    if (this.userId && this.game) {
      this.usersListCompletedService.getCompletedByUserId(this.userId).subscribe({
        next: (list) => {
          this.verCompleted = list?.games.some(game => game.gameId === this.game!.id) ?? false;
        }
      });
    }
  }

  addToPlayLater() {
    if (this.userId && this.game) {
      this.usersListPlayLaterService.addGameToPlayLater(this.userId, this.game.id).subscribe({
        next: () => {
          this.verPlayLater = true;
          this.verCurrentlyPlaying = false;
          this.verPlayed = false;
          this.verCompleted = false;
        }
      });
    }
  }

  addToCurrentlyPlaying() {
    if (this.userId && this.game) {
      this.usersListCurrentlyPlayingService.addGameToCurrentlyPlaying(this.userId, this.game.id).subscribe({
        next: () => {
          this.verCurrentlyPlaying = true;
          this.verPlayLater = false;
          this.verPlayed = false;
          this.verCompleted = false;
        }
      });
    }
  }

  addToPlayed() {
    if (this.userId && this.game) {
      this.usersListPlayedService.addGameToPlayed(this.userId, this.game.id).subscribe({
        next: () => {
          this.verPlayed = true;
        }
      });
    }
  }

  addToCompleted() {
    if (this.userId && this.game) {
      this.usersListCompletedService.addGameToCompleted(this.userId, this.game.id).subscribe({
        next: () => {
          this.verCompleted = true;
        }
      });
    }
  }

  removeFromPlayLater() {
    if (this.userId && this.game) {
      this.usersListPlayLaterService.removeGameFromPlayLater(this.userId, this.game.id).subscribe({
        next: () => {
          this.verPlayLater = false;
        }
      });
    }
  }

  removeFromCurrentlyPlaying() {
    if (this.userId && this.game) {
      this.usersListCurrentlyPlayingService.removeGameFromCurrentlyPlaying(this.userId, this.game.id).subscribe({
        next: () => {
          this.verCurrentlyPlaying = false;
        }
      });
    }
  }

  removeFromPlayed() {
    if (this.userId && this.game) {
      this.usersListPlayedService.removeGameFromPlayed(this.userId, this.game.id).subscribe({
        next: () => {
          this.verPlayed = false;
        }
      });
    }
  }

  removeFromCompleted() {
    if (this.userId && this.game) {
      this.usersListCompletedService.removeGameFromCompleted(this.userId, this.game.id).subscribe({
        next: () => {
          this.verCompleted = false;
        }
      });
    }
  }
}
