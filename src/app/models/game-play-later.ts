export interface GamePlayLater {
    id:string;
    userId: string;
    games: GameArray[];

}

interface GameArray {
    gameId : number;
    createDate: string,
}
