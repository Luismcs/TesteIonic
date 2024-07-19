export interface GamePlayLater {
  id: string;
  userId: string;
  games: GameArray[];
}

export interface GameArray {
  gameId: number;
  createDate: string;
}
