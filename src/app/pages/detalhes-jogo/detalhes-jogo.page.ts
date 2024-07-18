import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonList, IonListHeader, IonLabel, IonText, IonItem, IonImg, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { GameListService } from 'src/app/services/game-list.service';
import { GameDetails } from 'src/app/models/game-details';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detalhes-jogo',
  templateUrl: './detalhes-jogo.page.html',
  styleUrls: ['./detalhes-jogo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonList, IonListHeader, IonLabel, IonText, IonItem, IonImg, IonGrid, IonRow, IonCol,HttpClientModule],
  providers: [GameListService],
})
export class DetalhesJogoPage implements OnInit {

  game: GameDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private gamesListService: GameListService
  ) { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gamesListService.getGameDetails(gameId).subscribe({
        next: (response) => {
          console.log(response);
          if (response && response.length > 0) {
            this.game = response[0];
          }
        }
      });
    }
  }
}
